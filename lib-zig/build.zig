const std = @import("std");

fn stripLastExtension(basename: []const u8) []const u8 {
    const last_dot = std.mem.lastIndexOfScalar(u8, basename, '.') orelse return basename;
    return basename[0..last_dot];
}

const BindingsWit = struct {
    b: *std.Build = undefined,
    build: *std.Build.Step.Run = undefined,
    path_relative_dest: []const u8 = undefined,

    const Options = struct {
        path_relative_wit: []const u8 = "wit",
        path_relative_dest: []const u8 = "bindings",
    };

    pub fn init(b: *std.Build, opt: ?Options) BindingsWit {
        const options = opt orelse Options{};

        const path_wit = b.pathFromRoot(options.path_relative_wit);
        const path_dest = b.pathFromRoot(options.path_relative_dest);

        // FIXME: because this is evaluated during build time, bindings are not generated before the first build, but
        // will be available on subsequent builds. Every time bindings change it's neccessary to run build twice.
        // That's a trade of to get zig caching working. Alternatively in place command execution could've been used
        const build_ = b.addSystemCommand(&.{
            "wit-bindgen",
            "c",
            "--autodrop-borrows",
            "yes",
            path_wit,
            "--out-dir",
            path_dest,
        });

        return .{
            .b = b,
            .build = build_,
            .path_relative_dest = options.path_relative_dest,
        };
    }

    pub fn attachTo(this: *BindingsWit, compile: *std.Build.Step.Compile) !void {
        compile.step.dependOn(&this.build.step);
        this.b.getInstallStep().dependOn(&this.build.step);

        const path_dest = this.b.pathFromRoot(this.path_relative_dest);
        std.fs.makeDirAbsolute(path_dest) catch |err| {
            if (err != std.fs.Dir.MakeError.PathAlreadyExists) return err;
        };

        var dir = try std.fs.openDirAbsolute(path_dest, .{ .iterate = true, .access_sub_paths = true });
        defer dir.close();

        var dir_iterator = try dir.walk(this.b.allocator);
        defer dir_iterator.deinit();

        while (try dir_iterator.next()) |entry| {
            switch (entry.kind) {
                .file => this.attachEntryToCompile(compile, entry.basename),
                else => continue,
            }
        }

        compile.addIncludePath(this.b.path(this.path_relative_dest));
    }

    /// This method is internal and should not be called directly by consumer
    fn attachEntryToCompile(this: *const BindingsWit, compile: *std.Build.Step.Compile, basename: []const u8) void {
        const b = this.b;
        const path = b.pathJoin(&.{ this.path_relative_dest, basename });

        if (std.mem.endsWith(u8, basename, ".c")) {
            compile.addCSourceFile(.{ .file = b.path(path), .flags = &.{} });
        } else if (std.mem.endsWith(u8, basename, ".o")) {
            compile.addObjectFile(b.path(path));
        }
    }
};

const BindingsWasmComponent = struct {
    b: *std.Build = undefined,
    command: *std.Build.Step.Run = undefined,
    path_relative_component: []const u8 = undefined,

    const Options = struct {
        path_relative_adapter: []const u8 = "../toolchain/wasi_snapshot_preview1.reactor.wasm",
    };

    pub fn init(b: *std.Build, compile: *std.Build.Step.Compile, opt: ?Options) !BindingsWasmComponent {
        const options = opt orelse Options{};
        const input = try std.fmt.allocPrint(b.allocator, "zig-out/bin/{s}", .{compile.out_filename});
        const out = try std.fmt.allocPrint(b.allocator, "zig-out/bin/{s}.component.wasm", .{stripLastExtension(compile.out_filename)});

        const command = b.addSystemCommand(&.{
            "wasm-tools",
            "component",
            "new",
            input,
            "-o",
            out,
            "--adapt",
            options.path_relative_adapter,
        });
        command.step.dependOn(&compile.step);
        b.getInstallStep().dependOn(&command.step);

        return .{
            .b = b,
            .command = command,
            .path_relative_component = out,
        };
    }
};

const BindingsWasmTranspile = struct {
    b: *std.Build = undefined,
    command: *std.Build.Step.Run = undefined,

    const Options = struct {
        path_relative_out: []const u8 = "dist",
    };

    pub fn init(b: *std.Build, wasm_component: *const BindingsWasmComponent, opt: ?Options) !BindingsWasmTranspile {
        const options = opt orelse Options{};

        std.fs.cwd().makeDir(options.path_relative_out) catch |err| {
            if (err != std.fs.Dir.MakeError.PathAlreadyExists) return err;
        };

        const command = b.addSystemCommand(&.{
            "jco",
            "transpile",
            "--optimize",
            "--base64-cutoff",
            "1048576",
            wasm_component.path_relative_component,
            "-o",
            options.path_relative_out,
        });

        command.step.dependOn(&wasm_component.command.step);
        b.getInstallStep().dependOn(&command.step);

        return .{
            .b = b,
            .command = command,
        };
    }
};

pub fn build(b: *std.Build) !void {
    const target = b.standardTargetOptions(.{
        .default_target = .{
            .os_tag = .wasi,
            .cpu_arch = .wasm32,
        },
    });

    const optimize = b.standardOptimizeOption(.{
        .preferred_optimize_mode = .ReleaseFast,
    });

    const main_mod = b.createModule(.{
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
        .sanitize_c = true,
        .strip = true,
        .link_libc = true,
    });

    const zalgebra = b.dependency("zalgebra", .{
        .target = target,
        .optimize = optimize,
    });

    main_mod.addImport("zalgebra", zalgebra.module("zalgebra"));

    const main_exe = b.addExecutable(.{
        .name = "main",
        .root_module = main_mod,
        .optimize = optimize,
        .strip = true,
    });

    var bindings = BindingsWit.init(b, .{ .path_relative_wit = "../wit" });
    try bindings.attachTo(main_exe);

    const wasm_component = try BindingsWasmComponent.init(b, main_exe, .{});
    _ = try BindingsWasmTranspile.init(b, &wasm_component, .{});

    b.installArtifact(main_exe);

    const exe_unit_tests = b.addTest(.{
        .root_module = main_mod,
    });
    exe_unit_tests.root_module.addImport("zalgebra", zalgebra.module("zalgebra"));

    const run_exe_unit_tests = b.addRunArtifact(exe_unit_tests);

    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&run_exe_unit_tests.step);

    const run_bindgen = b.step("bindgen", "Run wit-bindgen");
    run_bindgen.dependOn(&bindings.build.step);
}
