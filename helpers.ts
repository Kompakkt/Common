/**
 * Converts a dirty/ambiguous vector object with properties x, y, z or _x, _y, _z
 * to a clean vector object with properties x, y, z.
 */
export const asVector3 = (
  vector: { x: number; y: number; z: number } | { _x: number; _y: number; _z: number },
) => {
  if ('_x' in vector && '_y' in vector && '_z' in vector) {
    return { x: vector._x, y: vector._y, z: vector._z };
  }
  return { x: vector.x, y: vector.y, z: vector.z };
};
