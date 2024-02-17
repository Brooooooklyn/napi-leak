import { setTimeout } from 'node:timers/promises'
import { createRequire } from 'node:module'

import { displayMemoryUsageFromNode } from './util.js'

const require = createRequire(import.meta.url);

const { A } = require('./index.node');

gc();
const initialMemoryUsage = process.memoryUsage()

let i = 0;
while(true) {
  const a = new A();
  a.newB();
  // if (i % 1000000 === 0) {
    await setTimeout(1000);
    gc();
    displayMemoryUsageFromNode(initialMemoryUsage)
  // }
  await setTimeout(1000000)
  i++;
}
