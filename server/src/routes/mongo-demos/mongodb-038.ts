import { numberInput, nativeTransfer } from '../mongo-tools.js';
import type { Demo } from '../mongo-tools.js';

export const examples: Demo[] = [
  ({ db, input, connection }) => {
    return nativeTransfer(db, connection, numberInput(input, 1, 50), false);
  },
  ({ db, input, connection }) => {
    return nativeTransfer(db, connection, numberInput(input, 1, 50), true);
  },
  ({ db, input, connection }) => {
    return nativeTransfer(db, connection, numberInput(input, 1, 50), false);
  }
];
