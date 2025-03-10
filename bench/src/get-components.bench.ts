import { bench } from 'vitest';
import { Vector3 } from 'three';

import { stateful as zig } from '../../lib-zig/dist/main.component';
import { stateful as cpp } from '../../lib-cpp/dist/main.component';


interface PositionComponent {
  id: number;
  position: Vector3;
}

const positions : Array<PositionComponent> = (() => {
  const positions = new Array<Vector3>(1000);
  const ids = new Array<number>(1000);

  for (let i = 0; i < positions.length; i++) {
    positions[i] = new Vector3(Math.random(), Math.random(), Math.random());
    ids[i] = i;
  }

  return positions.map((position, index) => ({
    id: ids[index],
    position
  }));
})();


bench('wasm zig', (() => {
  const projectorHandle = new zig.ClipProjector();
  projectorHandle.fillComponents(positions);

  return () => {
    projectorHandle.getComponents();
  };
})());


bench('wasm cpp', (() => {
  const projectorHandle = new cpp.ClipProjector();
  projectorHandle.fillComponents(positions);

  return () => {
    projectorHandle.getComponents();
  };
})());
