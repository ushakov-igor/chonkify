import { chonk, chonkAsync, chonkGraphemes } from '../index.js';

// Basic tests
console.assert(JSON.stringify(chonk([1, 2, 3, 4], 2)) === JSON.stringify([[1, 2], [3, 4]]));
console.assert(JSON.stringify(chonk('abcdef', 2)) === JSON.stringify(['ab', 'cd', 'ef']));
console.assert(JSON.stringify(chonk('abcdef', 3)) === JSON.stringify(['abc', 'def']));

// Buffer test
const buffer = Buffer.from('hello world');
console.assert(Buffer.isBuffer(chonk(buffer, 3)[0]));
console.assert(chonk(buffer, 3).length === 4);

// Set and Map test
console.assert(JSON.stringify(chonk(new Set([1, 2, 3, 4, 5, 6]), 2)) === JSON.stringify([[1, 2], [3, 4], [5, 6]]));
console.assert(chonk(new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4]]), 2).length === 2);

// Array-like object test
console.assert(JSON.stringify(chonk({ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, 2)) === JSON.stringify([['a', 'b'], ['c', 'd']]));

// TypedArray test
console.assert(chonk(new Int8Array([1, 2, 3, 4, 5, 6]), 3).length === 2);

// Empty input test
console.assert(JSON.stringify(chonk([], 3)) === JSON.stringify([]));
console.assert(JSON.stringify(chonk('', 2)) === JSON.stringify([]));

// Chunk size test
console.assert(JSON.stringify(chonk([1, 2, 3], 10)) === JSON.stringify([[1, 2, 3]]));
console.assert(JSON.stringify(chonk([1, 2, 3], 1)) === JSON.stringify([[1], [2], [3]]));

// ----- Emoji tests -----

// Standard chonk with emoji (UTF-16 code points)
const emojiString = '👍👌✌️😀🙌👏';

// Test chonk behavior (standard UTF-16 splitting)
const emojiChunksStandard = chonk(emojiString, 2);
// This should split at code point level, not grapheme level
console.assert(emojiChunksStandard.length > 3, "chonk should split by code points, not graphemes");

// Test chonkGraphemes behavior
const expectedEmojiChunks = ['👍👌', '✌️😀', '🙌👏'];
const emojiChunksGraphemes = chonkGraphemes(emojiString, 2);
console.assert(JSON.stringify(emojiChunksGraphemes) === JSON.stringify(expectedEmojiChunks), 
               "chonkGraphemes should correctly split emoji graphemes");

const complexEmojiString = '👨‍👩‍👧‍👦👩‍💻🏳️‍🌈';

// Test chonk with complex emojis
const complexEmojiChunksStandard = chonk(complexEmojiString, 5);
console.assert(complexEmojiChunksStandard.length >= 3, 
               "chonk should split complex emojis into multiple code points");

// Test chonkGraphemes with complex emojis
const expectedComplexChunks = ['👨‍👩‍👧‍👦', '👩‍💻', '🏳️‍🌈'];
const complexEmojiChunksGraphemes = chonkGraphemes(complexEmojiString, 1);
console.assert(JSON.stringify(complexEmojiChunksGraphemes) === JSON.stringify(expectedComplexChunks),
               "chonkGraphemes should correctly handle complex emojis as single graphemes");

const mixedEmojiString = '👨‍👩‍👧‍👦👩‍💻🏳️‍🌈😀👍';
const expectedMixedChunks = ['👨‍👩‍👧‍👦👩‍💻', '🏳️‍🌈😀', '👍'];
const mixedEmojiChunksGraphemes = chonkGraphemes(mixedEmojiString, 2);
console.assert(JSON.stringify(mixedEmojiChunksGraphemes) === JSON.stringify(expectedMixedChunks),
               "chonkGraphemes should correctly chunk mixed complex emojis");

// Error test
let hasError = false;
try { chonk(null, 3); } catch (e) { hasError = true; }
console.assert(hasError);

hasError = false;
try { chonk([1, 2, 3], 0); } catch (e) { hasError = true; }
console.assert(hasError);

// Error test for chonkGraphemes
hasError = false;
try { chonkGraphemes(null, 3); } catch (e) { hasError = true; }
console.assert(hasError);

hasError = false;
try { chonkGraphemes([1, 2, 3], 0); } catch (e) { hasError = true; }
console.assert(hasError);

// AsyncIterable test
async function runAsyncTests() {
  async function* generator() {
    for (let i = 1; i <= 6; i++) yield i;
  }
  
  const results = [];
  for await (const chunk of chonkAsync(generator(), 2)) {
    results.push(chunk);
  }
  console.assert(JSON.stringify(results) === JSON.stringify([[1, 2], [3, 4], [5, 6]]));
  
  async function* emptyGenerator() { return; }
  
  const emptyResults = [];
  for await (const chunk of chonkAsync(emptyGenerator(), 2)) {
    emptyResults.push(chunk);
  }
  console.assert(emptyResults.length === 0);
}

// Run tests
console.log('Running tests...');
runAsyncTests().then(() => {
  console.log('All tests passed!');
});
