import { fixedChild } from '../node-tools.js';

export const examples = [
  () => {
    return { runtime: process.release.name, platform: process.platform, uptimeSeconds: Math.floor(process.uptime()) };
  },
  () => {
    return fixedChild("console.log('finished'); process.exitCode = 3;");
  }
];
