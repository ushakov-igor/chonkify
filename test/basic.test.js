
import { chonk } from '../index.js';

console.assert(JSON.stringify(chonk([1, 2, 3, 4], 2)) === JSON.stringify([[1, 2], [3, 4]]));
console.assert(JSON.stringify(chonk('abcdef', 3)) === JSON.stringify(['abc', 'def']));

console.log('All tests passed!');
