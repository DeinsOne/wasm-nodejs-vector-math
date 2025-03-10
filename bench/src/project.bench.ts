import { bench } from 'vitest';
import { Matrix4, PerspectiveCamera, Vector3 } from 'three';

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


const projection : Matrix4 = (() => {
  const camera = new PerspectiveCamera();
  camera.position.set(3,3,3);
  camera.lookAt(0,0,0);
  return camera.projectionMatrix;
})();


bench('wasm zig', (() => {
  const projectorHandle = new zig.ClipProjector();
  projectorHandle.fillComponents(positions);

  const projectionArray = Float32Array.from(projection.elements);
  projectorHandle.setProjection(projectionArray);

  return () => {
    projectorHandle.project();
  };
})());


bench('wasm cpp', (() => {
  const projectorHandle = new cpp.ClipProjector();
  projectorHandle.fillComponents(positions);

  const projectionArray = Float32Array.from(projection.elements);
  projectorHandle.setProjection(projectionArray);

  return () => {
    projectorHandle.project();
  };
})());



class Projector {
  constructor( private positions: Array<PositionComponent>, public projection: Matrix4 ) {
  }

  project() {
    for (let i = 0; i < this.positions.length; i++) {
      const position = this.positions[i].position;
      const projectedPosition = position.clone().applyMatrix4(this.projection);

      if (projectedPosition.x < -1 || projectedPosition.x > 1) continue;
      if (projectedPosition.y < -1 || projectedPosition.y > 1) continue;
      if (projectedPosition.z < 0 || projectedPosition.z > 1) continue;
    }
  }
}


bench('js', (() => {
  const projectorHandle = new Projector(positions, projection);

  return () => {
    projectorHandle.project();
  };
})());
