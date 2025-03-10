import { bench } from 'vitest';
import { Matrix4, PerspectiveCamera } from 'three';

import { stateful as zig } from '../../lib-zig/dist/main.component';
import { stateful as cpp } from '../../lib-cpp/dist/main.component';


const projection : Matrix4 = (() => {
  const camera = new PerspectiveCamera();
  camera.position.set(3,3,3);
  camera.lookAt(0,0,0);
  return camera.projectionMatrix;
})();


bench('wasm zig - pre created', (() => {
  const projectorHandle = new zig.ClipProjector();
  const projectionArray = Float32Array.from(projection.elements);

  return () => {
    projectorHandle.setProjection(projectionArray);
  };
})());


bench('wasm cpp - pre created', (() => {
  const projectorHandle = new cpp.ClipProjector();
  const projectionArray = Float32Array.from(projection.elements);

  return () => {
    projectorHandle.setProjection(projectionArray);
  };
})());



bench('wasm zig - on fly', (() => {
  const projectorHandle = new zig.ClipProjector();

  return () => {
    const projectionArray = Float32Array.from(projection.elements);
    projectorHandle.setProjection(projectionArray);
  };
})());


bench('wasm cpp - on fly', (() => {
  const projectorHandle = new cpp.ClipProjector();

  return () => {
    const projectionArray = Float32Array.from(projection.elements);
    projectorHandle.setProjection(projectionArray);
  };
})());
