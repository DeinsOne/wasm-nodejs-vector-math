const std = @import("std");
const za = @import("zalgebra");

pub const Projector = struct {
    allocator: std.mem.Allocator = undefined,
    components: std.AutoHashMap(u32, Position) = undefined,
    projection: za.Mat4 = undefined,

    const Position = za.Vec3;

    pub const Component = struct {
        id: u32,
        position: Position,
    };

    pub fn init(allocator: std.mem.Allocator) Projector {
        return Projector{
            .allocator = allocator,
            .components = std.AutoHashMap(u32, Position).init(allocator),
            .projection = za.Mat4.identity(),
        };
    }

    pub fn deinit(self: *Projector) void {
        self.components.deinit();
    }

    pub fn getComponentsCount(self: *Projector) u32 {
        return self.components.count();
    }

    pub fn getComponents(self: *Projector) std.mem.Allocator.Error!std.ArrayList(Component) {
        var result = std.ArrayList(Component).init(self.allocator);

        try result.ensureTotalCapacity(self.components.count());

        var iterator = self.components.iterator();
        while (iterator.next()) |component| result.appendAssumeCapacity(Component{
            .id = component.key_ptr.*,
            .position = component.value_ptr.*,
        });

        return result;
    }

    pub fn fillComponents(self: *Projector, components: *const []Component) std.mem.Allocator.Error!void {
        try self.ensureUnusedCapacity(components.len);

        for (components.*) |component| {
            self.components.putAssumeCapacity(component.id, component.position);
        }
    }

    pub fn putComponent(self: *Projector, id: u32, position: Position) std.mem.Allocator.Error!void {
        try self.components.put(id, position);
    }

    /// Ensure that the hashmap has enough capacity to store `capacity` more elements. This method is required to remove
    /// direct access to component internal implementation
    pub fn ensureUnusedCapacity(self: *Projector, capacity: u32) std.mem.Allocator.Error!void {
        try self.components.ensureUnusedCapacity(capacity);
    }

    pub fn setProjection(self: *Projector, matrix: za.Mat4) void {
        self.projection = matrix;
    }

    // This method does only multiplication, doesn't store results anywhere
    pub fn project(self: *Projector) void {
        var iterator = self.components.iterator();

        while (iterator.next()) |component| {
            _ = za.Mat4.mulByVec4(self.projection, za.Vec4.fromVec3(component.value_ptr.*, 1.0));
        }
    }
};
