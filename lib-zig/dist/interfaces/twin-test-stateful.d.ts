/** @module Interface twin:test/stateful **/
export type Vec3 = import('./twin-test-math.js').Vec3;
export type Mat4 = import('./twin-test-math.js').Mat4;
export interface Component {
  id: number,
  position: Vec3,
}

export class ClipProjector {
  constructor()
  getComponentsCount(): number;
  getComponents(): Array<Component>;
  fillComponents(components: Array<Component>): void;
  setProjection(matrix: Mat4): void;
  project(): void;
}
