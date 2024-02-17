import { setTimeout } from 'node:timers/promises'
import { createRequire } from 'node:module'

import { displayMemoryUsageFromNode } from './util.js'

const require = createRequire(import.meta.url);

const { A } = require('./index.node');

gc();
const initialMemoryUsage = process.memoryUsage()

let i = 0;

function exec() {
  const a = new A();
  a.newB();
}

while(true) {
  exec()
  if (i % 1024000 === 0) {
    await setTimeout(1000);
    gc();
    displayMemoryUsageFromNode(initialMemoryUsage)
  }
  
  // await setTimeout(1000000)
  i++;
  if (i % (1024000 * 5) === 0) {
    break;
  }
}

setInterval(() => {
  gc();
  displayMemoryUsageFromNode(initialMemoryUsage)
}, 5000)
