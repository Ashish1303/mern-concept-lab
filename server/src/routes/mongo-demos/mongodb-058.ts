import { numberInput } from '../mongo-tools.js';
import { mongooseTransfer } from '../mongo-odm.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  ({ input, connection }) => {
    return mongooseTransfer(connection, numberInput(input, 1, 50), false);
  },
  ({ input, connection }) => {
    return mongooseTransfer(connection, numberInput(input, 1, 50), true);
  }
];
