import { json, mountBooks, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(mountBooks, (send, input) => send("/books", json("POST", { title: input }))),
  requestDemo(mountBooks, (send, input) => send("/books", json("POST", { title: input })))
];
