# Contributing Guide

## Project Structure

- `src/index.js` - full version of the code with comments (for development)
- `index.js` - minified version (for usage)
- `index.d.ts` - TypeScript types
- `.husky/` - git hooks configuration

## Development

1. Make all changes in the `src/index.js` file
2. To minify the code, use the command:
   ```
   npm run minify
   ```
3. Before submitting a PR, make sure the tests pass:
   ```
   npm test
   ```

## Automatic Minification

The project is configured so that:

1. Minification runs automatically before `npm publish` thanks to the `prepublishOnly` script
2. Minification runs before pushing to the repository using the `pre-push` git hook (managed by husky)

## Development Setup

When you first clone the repository, run:

```
npm install
```

This will automatically set up husky git hooks through the `prepare` script.

## Minification Details

The project uses [Terser](https://github.com/terser/terser) for JavaScript minification with the following configuration:

- ECMAScript 2020 syntax support
- Module mode for handling ES modules
- Multiple compression passes for better minification
- Property name preservation (to maintain API compatibility)
- Comment removal

## Adding New Features

1. Add new code to `src/index.js`
2. Add types to `index.d.ts` if necessary
3. Write tests for the new functionality in the `test/` directory
4. Run minification: `npm run minify`
5. Make sure all tests pass: `npm test`
6. Submit a PR 