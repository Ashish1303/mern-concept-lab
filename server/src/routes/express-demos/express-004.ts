import { json, mountBooks, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(mountBooks, async (send, input) => [await send("/books/1", json("PUT", { title: input })), await send("/books/1")]),
  requestDemo(mountBooks, async (send, input) => {
    const init = json("PUT", { title: input });
    return [await send("/books/1", init), await send("/books/1", init)];
  })
];
