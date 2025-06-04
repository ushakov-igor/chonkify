/**
 * Splits input data into chunks of specified size.
 * Supports strings, arrays, TypedArray, iterable objects.
 * For strings, uses UTF-16 code points (standard JavaScript behavior).
 * 
 * @param {Array|String|Iterable|Object} input - Input data to split
 * @param {Number} chunkSize - Chunk size
 * @returns {Array} Array of chunks
 * @throws {Error} If input data is invalid
 */
export function chonk(input, chunkSize) {
  // Input validation
  if (input == null || +chunkSize < 1) {
    throw Error('Invalid input');
  }

  // String handling
  if (typeof input === 'string') {
    if (!input.length) {
      return [];
    }
    
    // Standard JavaScript behavior: work with UTF-16 code points
    let characters = Array.from(input);
    
    let result = [];
    for (let index = 0; index < characters.length; index += chunkSize) {
      result.push(characters.slice(index, index + chunkSize).join(''));
    }
    
    return result;
  }

  // Arrays and typed arrays handling
  if (Array.isArray(input) || ArrayBuffer.isView(input)) {
    if (!input.length) {
      return [];
    }
    
    let result = [];
    for (let index = 0; index < input.length; index += chunkSize) {
      result.push(input.slice(index, index + chunkSize));
    }
    
    return result;
  }

  // Object handling
  if (typeof input === 'object') {
    // Iterable objects handling
    try {
      if (input[Symbol.iterator]) {
        return chonk([...input], chunkSize);
      }
    } catch (error) {}

    // Objects with length property
    if (input && +input.length > -1) {
      if (!input.length) {
        return [];
      }
      
      let array = [];
      for (let index = 0; index < input.length; index++) {
        array[index] = input[index];
      }
      
      return chonk(array, chunkSize);
    }
  }

  throw Error('Invalid type');
}

/**
 * Splits string input data into chunks based on Unicode grapheme clusters.
 * For non-string inputs, behaves the same as chonk().
 * Correctly handles emoji and complex symbols like 👨‍👩‍👧‍👦 🏳️‍🌈.
 * 
 * @param {Array|String|Iterable|Object} input - Input data to split
 * @param {Number} chunkSize - Chunk size
 * @returns {Array} Array of chunks
 * @throws {Error} If input data is invalid
 */
export function chonkGraphemes(input, chunkSize) {
  // Non-string inputs are processed with standard chonk
  if (typeof input !== 'string') {
    return chonk(input, chunkSize);
  }
  
  // Input validation
  if (input == null || +chunkSize < 1) {
    throw Error('Invalid input');
  }

  // String handling with grapheme support
  if (!input.length) {
    return [];
  }
  
  // Using Intl.Segmenter for correct grapheme splitting (if available)
  let characters = Intl?.Segmenter 
    ? Array.from(new Intl.Segmenter(0, { granularity: 'grapheme' }).segment(input), segment => segment.segment)
    : Array.from(input);
  
  let result = [];
  for (let index = 0; index < characters.length; index += chunkSize) {
    result.push(characters.slice(index, index + chunkSize).join(''));
  }
  
  return result;
}

/**
 * Async generator for splitting async iterable objects into chunks.
 * 
 * @param {AsyncIterable} asyncInput - Async iterable object
 * @param {Number} chunkSize - Chunk size
 * @yields {Array} Chunks of data
 * @throws {Error} If input data is invalid
 */
export async function* chonkAsync(asyncInput, chunkSize) {
  if (asyncInput == null || +chunkSize < 1 || !asyncInput[Symbol.asyncIterator]) {
    throw Error('Invalid input');
  }
  
  let buffer = [];
  
  for await (const item of asyncInput) {
    buffer.push(item);
    
    if (buffer.length >= chunkSize) {
      yield buffer;
      buffer = [];
    }
  }
  
  if (buffer.length) {
    yield buffer;
  }
} 