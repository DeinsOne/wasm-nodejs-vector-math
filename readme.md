# WebAssembly vs Node.js Vector Math Performance

This repository compares C++ and Zig for building high-performance WebAssembly modules for web applications. For developers not using Rust or seeking extensive library support - **C++** is a well-established language with extensive libraries and good performance, but suboptimal developer experience. However **Zig** is a modern language with focus on performance, safety, and simplicity - essentially a modern C with better developer experience.

The repo features:

- focuses on vector math performance across different implementations
- provides benchmarks for common (multiplication) vector operations
- includes build artifacts for clarity


## Benchmarks

```
src/fill-components.bench.ts - copy data from JS to WASM, in chunks by 10 f32 values

  name              hz     min     max    mean     p75     p99    p995    p999     rme  samples
· wasm zig  285,031.52  0.0029  0.3836  0.0035  0.0037  0.0068  0.0092  0.0275  ±0.33%   142516
· wasm cpp  655,746.74  0.0012  2.7653  0.0015  0.0014  0.0029  0.0039  0.0127  ±2.53%   327874   fastest
```

```
src/get-components.bench.ts - copy data from WASM to JS, in chunks by 1000 f32 values

  name            hz     min     max    mean     p75     p99    p995    p999     rme  samples
· wasm zig  3,833.83  0.2017  3.1483  0.2608  0.2445  0.9920  1.6740  3.0735  ±3.28%     1917
· wasm cpp  7,129.45  0.1177  1.1686  0.1403  0.1369  0.5662  0.7669  0.9852  ±1.64%     3565   fastest
```

```
src/set-projection.bench.ts - set projection matrix (copy chunk of 16 f32 values from JS to WASM)

  name                              hz     min     max    mean     p75     p99    p995    p999     rme  samples
· wasm zig - pre created  1,307,542.58  0.0002  3.1359  0.0008  0.0003  0.0014  0.0019  0.0122  ±8.00%   654790
· wasm cpp - pre created  1,494,445.88  0.0002  3.6448  0.0007  0.0003  0.0014  0.0019  0.0110  ±7.94%   747223   fastest
· wasm zig - on fly         127,744.48  0.0006  2.0156  0.0078  0.0008  0.1062  0.1373  1.4591  ±7.59%    63873
· wasm cpp - on fly         121,231.44  0.0006  2.3314  0.0082  0.0009  0.1179  0.1591  1.4883  ±7.72%    60619   slowest
```

```
src/project.bench.ts - project 1000 points (multiply 4x4 matrix by 4d vector)

  name              hz     min     max    mean     p75     p99    p995    p999     rme  samples
· wasm zig   10,785.26  0.0785  0.5277  0.0927  0.0949  0.2315  0.2581  0.4459  ±0.85%     5393   slowest
· wasm cpp  593,445.17  0.0014  0.3856  0.0017  0.0016  0.0037  0.0042  0.0133  ±0.41%   296723   fastest
· js         34,969.97  0.0194  1.1218  0.0286  0.0267  0.1080  0.3235  0.5348  ±1.83%    17485
```


## Key Findings

- **Zig limitations**:
  - lacks tier 1 support for wasi32 target [#23091](https://github.com/ziglang/zig/issues/2309) (expected in version 0.16.0, ~1.5 years away)
  - currently only builds wasi32 debug binaries [9342](https://github.com/ziglang/zig/issues/9342) (non-optimized, requires entry point)
  - not yet mature for WebAssembly [production use](https://github.com/ziglang/zig/issues?q=is%3Aissue%20state%3Aopen%20label%3Aarch-wasm)

- **Performance considerations**:
  - copying data between WebAssembly and JavaScript is expensive and should be minimized
  - C++ consistently outperforms Zig (C++ is optimized with `-O3` for release speed, while Zig doesn't support wasm optimization yet)


## Tools Used

- [wasm-tools](https://github.com/bytecodealliance/wasm-tools) - WebAssembly tools
- [wasi-sdk](https://github.com/webassembly/wasi-sdk) - c/c++ toolchain for WebAssembly
- [wasmtime wasi_snapshot_preview1 adapter](https://github.com/bytecodealliance/wasmtime) - WebAssembly runtime helper
- [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen) - WebAssembly interface types
- [jco](https://github.com/bytecodealliance/jco) - WebAssembly JavaScript interop
- [taskfile](https://taskfile.dev) - task runner
- [vitest](https://vitest.dev) - benchmarking tool
