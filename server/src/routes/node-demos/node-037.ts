import { fixedChild, withFixture } from '../node-tools.js';
import { rename } from 'node:fs/promises';

export const examples = [
  async () => {
    return withFixture("const cluster = require('node:cluster'); process.send({ worker: cluster.isWorker }); process.disconnect();", async file => {
      const script = file + '.cjs';
      await rename(file, script);
      return fixedChild("const cluster=require('node:cluster'); let file=''; process.stdin.setEncoding('utf8').on('data', chunk=>file+=chunk).on('end',()=>{ cluster.setupPrimary({exec:file,execArgv:[]}); const worker=cluster.fork(); worker.on('message', message=>console.log(JSON.stringify({primary:cluster.isPrimary,...message}))); worker.on('exit',code=>{process.exitCode=code ?? 1;}); });", script);
    });
  },
  async () => {
    return withFixture('process.exitCode = 4; process.disconnect();', async file => {
      const script = file + '.cjs';
      await rename(file, script);
      return fixedChild("const cluster=require('node:cluster'); let file=''; process.stdin.setEncoding('utf8').on('data', chunk=>file+=chunk).on('end',()=>{ cluster.setupPrimary({exec:file,execArgv:[]}); const worker=cluster.fork(); worker.on('exit',code=>console.log(JSON.stringify({state:worker.state,code}))); });", script);
    });
  }
];
