import { json, mountBooks, requestDemo } from '../express-tools.js';
export const examples = [
  requestDemo(mountBooks, send => send("/books")),
  requestDemo(mountBooks, async (send, input) => {
    const created = await send("/books", json("POST", { title: input }));
    return created.status === 201 && created.headers.location ? [created, await send(created.headers.location)] : [created];
  }),
  requestDemo(mountBooks, async (send, input) => {
    const created = await send("/books", json("POST", { title: input }));
    if (created.status !== 201 || !created.headers.location)
      return [created];
    const path = created.headers.location;
    return [created, await send(path), await send(path, json("PATCH", { title: "Updated title" })), await send(path, { method: "DELETE" }), await send(path)];
  })
];
