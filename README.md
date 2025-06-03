# 🐱 chonk
[![npm version](https://img.shields.io/npm/v/@ushakov-igor/chonk?style=flat-square)](https://www.npmjs.com/package/@ushakov-igor/chonk)
[![license](https://img.shields.io/npm/l/@ushakov-igor/chonk?style=flat-square)](https://github.com/ushakov-igor/chonk/blob/main/LICENSE)
[![build status](https://github.com/ushakov-igor/chonk/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/ushakov-igor/chonk/actions)

> Ultra-lightweight chunker for everything — arrays, strings, sets, maps, async iterables and more.

![logo](https://raw.githubusercontent.com/ushakov-igor/chonk/refs/heads/main/logo.svg)

## 📦 Install

```bash
npm install chonk
```

## ✨ Features

- Works with: Array, String, Buffer, Set, Map, Array-like, TypedArray
- Supports `AsyncIterable` (`for await`)
- < 500 bytes
- No dependencies
- ESM-first, TypeScript-ready

## 🧪 Usage

```js
import { chonk, chonkAsync } from 'chonk';

chonk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
chonk('abcdef', 2);     // ['ab', 'cd', 'ef']

// Async:
for await (const group of chonkAsync(fetchLines(), 100)) {
  console.log(group);
}
```

## 📄 License

MIT
