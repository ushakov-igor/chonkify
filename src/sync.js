
export function chonk(input, size) {
  if (!input || typeof size !== 'number' || size <= 0) {
    throw new Error('Invalid chunk size');
  }

  const result = [];

  if (typeof input === 'string' || Array.isArray(input) || ArrayBuffer.isView(input)) {
    for (let i = 0; i < input.length; i += size) {
      result.push(input.slice(i, i + size));
    }
    return result;
  }

  if (input instanceof Set || input instanceof Map) {
    return chonk(Array.from(input), size);
  }

  if (typeof input === 'object' && typeof input.length === 'number') {
    return chonk(Array.prototype.slice.call(input), size);
  }

  throw new Error('Unsupported input type');
}
