import type { ErrorRequestHandler } from 'express';

export class HttpError extends Error {
  constructor(public readonly status: number, public readonly code: string, message: string) {
    super(message);
  }
}

export const handleError: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (response.headersSent) { _next(error); return; }
  const parseError = error instanceof SyntaxError && 'status' in error && error.status === 400;
  const oversized = error instanceof Error && 'status' in error && error.status === 413;
  const status = error instanceof HttpError ? error.status : parseError ? 400 : oversized ? 413 : 500;
  const code = error instanceof HttpError ? error.code : parseError ? 'INVALID_JSON' : oversized ? 'BODY_TOO_LARGE' : 'INTERNAL_ERROR';
  const message = error instanceof HttpError ? error.message : parseError ? 'Request body must be valid JSON.' : oversized ? 'Request body exceeds the limit.' : 'An unexpected server error occurred.';
  response.status(status).json({ ok: false, error: { code, message }, requestId: response.locals.requestId });
};
