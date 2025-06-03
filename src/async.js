
export async function* chonkAsync(iterable, size) {
  if (!iterable || typeof iterable[Symbol.asyncIterator] !== 'function') {
    throw new Error('Input must be AsyncIterable');
  }

  let buffer = [];

  for await (const item of iterable) {
    buffer.push(item);
    if (buffer.length >= size) {
      yield buffer;
      buffer = [];
    }
  }

  if (buffer.length) yield buffer;
}
