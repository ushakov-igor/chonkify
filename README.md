<div align="center">
  <img src="https://raw.githubusercontent.com/ushakov-igor/chonkify/refs/heads/main/chonkify.svg" alt="chonkify logo" width="300" />
  <br />
  <br />
  <a href="https://www.npmjs.com/package/chonkify"><img src="https://img.shields.io/npm/v/chonkify" alt="npm version"></a>
  <a href="https://github.com/ushakov-igor/chonkify/blob/main/LICENSE"><img src="https://img.shields.io/github/license/ushakov-igor/chonkify" alt="license"></a>
  <a href="https://github.com/ushakov-igor/chonkify/actions/workflows/ci.yml"><img src="https://github.com/ushakov-igor/chonkify/actions/workflows/ci.yml/badge.svg?style=flat-square" alt="build status"></a>
  <br />
  <br />
  <strong>Ultra-lightweight chunker for everything — arrays, strings, sets, maps, async iterables and more.</strong>
</div>

## 📦 Installation

```bash
npm install chonkify
```

## ✨ Features

- **Works with everything:** Array, String, Buffer, Set, Map, Array-like, TypedArray
- **Supports AsyncIterable** (`for await`)
- **UTF-16 code points and Unicode graphemes support 👨‍👩‍👧‍👦🏳️‍🌈** 
- **Minimal size:** core just 1103 bytes, entire package ~7 kB
- **Zero dependencies**
- **ESM-first, TypeScript-ready**

## 🧪 Usage

```js
import { chonk, chonkAsync, chonkGraphemes } from 'chonkify';

// Basic examples
chonk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
chonk('abcdef', 2);     // ['ab', 'cd', 'ef']

// Standard chonk uses UTF-16 code points (like standard JS)
chonk('👍👌✌️😀', 2);  // May split emojis incorrectly

// Use chonkGraphemes for proper emoji support
chonkGraphemes('👍👌✌️😀', 2);  // ['👍👌', '✌️😀']
chonkGraphemes('👨‍👩‍👧‍👦🏳️‍🌈', 1); // ['👨‍👩‍👧‍👦', '🏳️‍🌈']

// Async usage:
for await (const group of chonkAsync(fetchLines(), 100)) {
  console.log(group);
}
```

## 🔍 API

### `chonk(iterable, size)`

Splits an iterable into groups of the specified size. For strings, splits by UTF-16 code points (standard JavaScript behavior).

```js
chonk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

### `chonkGraphemes(iterable, size)`

Same as `chonk()` but for strings, splits by Unicode grapheme clusters instead of code points. This correctly handles emoji and complex symbols like family emojis and flags.

```js
// Standard chonk may split complex emojis incorrectly
chonk('👨‍👩‍👧‍👦', 1); // May return multiple chunks

// chonkGraphemes correctly handles complex emoji
chonkGraphemes('👨‍👩‍👧‍👦', 1); // ['👨‍👩‍👧‍👦']
```

### `chonkAsync(asyncIterable, size)`

Asynchronously splits an iterable into groups of the specified size.

```js
// Process large datasets in batches
for await (const batch of chonkAsync(dataStream, 100)) {
  await processBatch(batch);
}
```

## 🤔 FAQ

### Can I use chonkify with Node.js?

Yes, chonkify works both in browsers and Node.js environments.

### Does it support nested data structures?

Yes, chonkify can handle nested data structures as it groups elements without transforming them.

## 📄 License

MIT
