import { mountBooks, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(mountBooks, send => send("/books")),
  requestDemo(mountBooks, send => send("/books/2"))
];
