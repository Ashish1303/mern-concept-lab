import type { RequestHandler } from 'express';
export const handler: RequestHandler<{ id: string }, { name: string }, unknown, { q?: string }> = (request, response) => { response.json({ name: request.params.id }); };
export const invalid: RequestHandler<{ id: string }> = (request, response) => {
 // @ts-expect-error -- URL parameters are strings.
 const numeric: number = request.params.id;
 response.json({ numeric });
};
