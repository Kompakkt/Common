import type { IAmbiguousVector3, IVector3 } from './schemas';

export const asVector3 = (vector: IAmbiguousVector3): IVector3 => {
  if ('_x' in vector) {
    return { x: vector._x, y: vector._y, z: vector._z };
  }
  return vector;
};
