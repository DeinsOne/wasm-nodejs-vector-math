const std = @import("std");

// the main function is required to be here for wasi impl
pub fn main() anyerror!void {}

pub usingnamespace @import("./projector.zig");
pub usingnamespace @import("./projector_c.zig");
