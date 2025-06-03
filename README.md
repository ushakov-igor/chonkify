# 🐱 chonkify
[![npm version](https://img.shields.io/npm/v/chonkify)](https://www.npmjs.com/package/chonkify)
[![license](https://img.shields.io/github/license/ushakov-igor/chonkify)](https://github.com/ushakov-igor/chonkify/blob/main/LICENSE)
[![build status](https://github.com/ushakov-igor/chonkify/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/ushakov-igor/chonkify/actions)

> Ultra-lightweight chunker for everything — arrays, strings, sets, maps, async iterables and more.

![logo](https://raw.githubusercontent.com/ushakov-igor/chonkify/refs/heads/main/logo.svg)

## 📦 Install

```bash
npm install chonkify
```

## ✨ Features

- Works with: Array, String, Buffer, Set, Map, Array-like, TypedArray
- Supports `AsyncIterable` (`for await`)
- Correctly handles Unicode emoji characters and complex symbols 👨‍👩‍👧‍👦 🏳️‍🌈 🎉
- Core code 870 bytes, total package ~4.5 kB
- No dependencies
- ESM-first, TypeScript-ready

## 🧪 Usage

```js
import { chonk, chonkAsync } from 'chonkify';

// Basic examples
chonk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
chonk('abcdef', 2);     // ['ab', 'cd', 'ef']

// Unicode emoji support
chonk('👍👌✌️😀', 2);  // ['👍👌', '✌️😀']
chonk('👨‍👩‍👧‍👦🏳️‍🌈', 1); // ['👨‍👩‍👧‍👦', '🏳️‍🌈']

// Async:
for await (const group of chonkAsync(fetchLines(), 100)) {
  console.log(group);
}
```

## 📄 License

MIT
