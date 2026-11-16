import { json, mountBooks, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(mountBooks, async (send, input) => [await send("/books/1", json("PATCH", { title: input })), await send("/books/1")]),
  requestDemo(mountBooks, (send, input) => send("/books/999", json("PATCH", { title: input })))
];
