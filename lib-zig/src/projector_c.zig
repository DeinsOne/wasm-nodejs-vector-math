const std = @import("std");
const impl = @import("./projector.zig");
const za = @import("zalgebra");

const c = @cImport({
    @cInclude("main.h");
});

const allocator = std.heap.page_allocator;

// exports_twin_test_stateful_own_clip_projector_t exports_twin_test_stateful_constructor_clip_projector(void);
export fn exports_twin_test_stateful_constructor_clip_projector() c.exports_twin_test_stateful_own_clip_projector_t {
    const projector = allocator.create(impl.Projector) catch return .{ .__handle = -1 };
    projector.* = impl.Projector.init(allocator);

    return c.exports_twin_test_stateful_clip_projector_new(@ptrCast(projector));
}

// exports_twin_test_stateful_own_clip_projector_t exports_twin_test_stateful_static_clip_projector_init(void);
export fn exports_twin_test_stateful_static_clip_projector_init() c.exports_twin_test_stateful_own_clip_projector_t {
    const projector = allocator.create(impl.Projector) catch return .{ .__handle = -1 };
    projector.* = impl.Projector.init(allocator);

    return c.exports_twin_test_stateful_clip_projector_new(@ptrCast(projector));
}

// void exports_twin_test_stateful_clip_projector_destructor(exports_twin_test_stateful_clip_projector_t *rep);
export fn exports_twin_test_stateful_clip_projector_destructor(rep: *c.exports_twin_test_stateful_clip_projector_t) void {
    const projector: *impl.Projector = @ptrFromInt(@intFromPtr(rep));
    projector.deinit();
    allocator.destroy(projector);
}

// uint32_t exports_twin_test_stateful_method_clip_projector_get_components_count(exports_twin_test_stateful_borrow_clip_projector_t self);
export fn exports_twin_test_stateful_method_clip_projector_get_components_count(self: c.exports_twin_test_stateful_borrow_clip_projector_t) u32 {
    const projector: *impl.Projector = @ptrCast(@alignCast(self));
    return projector.getComponentsCount();
}

// void exports_twin_test_stateful_method_clip_projector_fill_components(exports_twin_test_stateful_borrow_clip_projector_t self, exports_twin_test_stateful_list_component_t *components);
export fn exports_twin_test_stateful_method_clip_projector_fill_components(self: c.exports_twin_test_stateful_borrow_clip_projector_t, components: *c.exports_twin_test_stateful_list_component_t) bool {
    const projector: *impl.Projector = @ptrCast(@alignCast(self));

    projector.ensureUnusedCapacity(components.len) catch return false;

    for (0..components.len) |i| {
        const c_component = components.ptr[i];

        projector.putComponent(@intCast(c_component.id), za.Vec3.new(c_component.position.x, c_component.position.y, c_component.position.z)) catch return false;
    }

    return true;
}

// bool exports_twin_test_stateful_method_clip_projector_set_projection(exports_twin_test_stateful_borrow_clip_projector_t self, exports_twin_test_stateful_mat4_t *matrix);
export fn exports_twin_test_stateful_method_clip_projector_set_projection(self: c.exports_twin_test_stateful_borrow_clip_projector_t, matrix: *c.exports_twin_test_stateful_mat4_t) bool {
    if (matrix.len != 16) return false;

    const projector: *impl.Projector = @ptrCast(@alignCast(self));
    projector.setProjection(za.Mat4.fromSlice(@ptrCast(matrix.ptr)));

    return true;
}

// void exports_twin_test_stateful_method_clip_projector_project_inplace(exports_twin_test_stateful_borrow_clip_projector_t self);
export fn exports_twin_test_stateful_method_clip_projector_project(self: c.exports_twin_test_stateful_borrow_clip_projector_t) void {
    const projector: *impl.Projector = @ptrCast(@alignCast(self));
    projector.project();
}

// bool exports_twin_test_stateful_method_clip_projector_get_components(exports_twin_test_stateful_borrow_clip_projector_t self, exports_twin_test_stateful_list_component_t *ret);
export fn exports_twin_test_stateful_method_clip_projector_get_components(self: c.exports_twin_test_stateful_borrow_clip_projector_t, ret: *c.exports_twin_test_stateful_list_component_t) bool {
    const projector: *impl.Projector = @ptrCast(@alignCast(self));
    var components = projector.getComponents() catch return false;
    defer components.deinit();

    // Allocate memory for component array
    const components_array = allocator.alloc(c.exports_twin_test_stateful_component_t, components.items.len) catch return false;

    // Copy each component's data
    for (components.items, 0..) |component, i| {
        components_array[i].id = @intCast(component.id);
        components_array[i].position.x = component.position.x();
        components_array[i].position.y = component.position.y();
        components_array[i].position.z = component.position.z();
    }

    ret.ptr = components_array.ptr;
    ret.len = components_array.len;

    return true;
}
