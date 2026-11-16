import { mountBooks, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(mountBooks, async (send) => [await send("/books/1", { method: "DELETE" }), await send("/books/1")]),
  requestDemo(mountBooks, async (send) => [await send("/books/2", { method: "DELETE" }), await send("/books/2", { method: "DELETE" })])
];
