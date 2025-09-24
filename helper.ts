import type { IAmbiguousVector3, IVector3 } from './interfaces';

export const asVector3 = (vector: IAmbiguousVector3): IVector3 => {
  if ('_x' in vector) {
    return { x: vector._x, y: vector._y, z: vector._z };
  }
  return vector;
};

export type Subtract1<T extends number> = T extends 0
  ? 0
  : T extends 1
    ? 0
    : T extends 2
      ? 1
      : T extends 3
        ? 2
        : T extends 4
          ? 3
          : T extends 5
            ? 4
            : T extends 6
              ? 5
              : T extends 7
                ? 6
                : T extends 8
                  ? 7
                  : T extends 9
                    ? 8
                    : T extends 10
                      ? 9
                      : 0;

export type ResolveDepth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
