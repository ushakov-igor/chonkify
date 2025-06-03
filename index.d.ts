
export function chonk<T>(
  input: Iterable<T> | ArrayLike<T> | string | Set<T> | Map<any, T>,
  size: number
): T[][] | string[];

export function chonkAsync<T>(
  input: AsyncIterable<T>,
  size: number
): AsyncIterable<T[]>;
