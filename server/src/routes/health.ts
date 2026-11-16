import { Router } from 'express';
import { HttpError } from '../middleware/errors.js';

export const healthRouter = Router();

healthRouter.get('/health', (request, response) => {
  if (Object.keys(request.query).length > 0) throw new HttpError(400, 'INVALID_QUERY', 'The health check does not accept query parameters.');
  response.setHeader('Cache-Control', 'no-store');
  response.json({
    ok: true,
    data: {
      service: 'MERN Concept Lab API',
      status: 'healthy',
      database: { status: 'not_checked' },
      timestamp: new Date().toISOString()
    },
    requestId: response.locals.requestId
  });
});
