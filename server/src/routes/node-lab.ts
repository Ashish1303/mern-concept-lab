import { Router } from 'express';
import { HttpError } from '../middleware/errors.js';
import { examples as topic1 } from './node-demos/node-001.js';
import { examples as topic2 } from './node-demos/node-002.js';
import { examples as topic3 } from './node-demos/node-003.js';
import { examples as topic4 } from './node-demos/node-004.js';
import { examples as topic5 } from './node-demos/node-005.js';
import { examples as topic6 } from './node-demos/node-006.js';
import { examples as topic7 } from './node-demos/node-007.js';
import { examples as topic8 } from './node-demos/node-008.js';
import { examples as topic9 } from './node-demos/node-009.js';
import { examples as topic10 } from './node-demos/node-010.js';
import { examples as topic11 } from './node-demos/node-011.js';
import { examples as topic12 } from './node-demos/node-012.js';
import { examples as topic13 } from './node-demos/node-013.js';
import { examples as topic14 } from './node-demos/node-014.js';
import { examples as topic15 } from './node-demos/node-015.js';
import { examples as topic16 } from './node-demos/node-016.js';
import { examples as topic17 } from './node-demos/node-017.js';
import { examples as topic18 } from './node-demos/node-018.js';
import { examples as topic19 } from './node-demos/node-019.js';
import { examples as topic20 } from './node-demos/node-020.js';
import { examples as topic21 } from './node-demos/node-021.js';
import { examples as topic22 } from './node-demos/node-022.js';
import { examples as topic23 } from './node-demos/node-023.js';
import { examples as topic24 } from './node-demos/node-024.js';
import { examples as topic25 } from './node-demos/node-025.js';
import { examples as topic26 } from './node-demos/node-026.js';
import { examples as topic27 } from './node-demos/node-027.js';
import { examples as topic28 } from './node-demos/node-028.js';
import { examples as topic29 } from './node-demos/node-029.js';
import { examples as topic30 } from './node-demos/node-030.js';
import { examples as topic31 } from './node-demos/node-031.js';
import { examples as topic32 } from './node-demos/node-032.js';
import { examples as topic33 } from './node-demos/node-033.js';
import { examples as topic34 } from './node-demos/node-034.js';
import { examples as topic35 } from './node-demos/node-035.js';
import { examples as topic36 } from './node-demos/node-036.js';
import { examples as topic37 } from './node-demos/node-037.js';
import { examples as topic38 } from './node-demos/node-038.js';
import { examples as topic39 } from './node-demos/node-039.js';
import { examples as topic40 } from './node-demos/node-040.js';
import { examples as topic41 } from './node-demos/node-041.js';
import { examples as topic42 } from './node-demos/node-042.js';
import { examples as topic43 } from './node-demos/node-043.js';
import { examples as topic44 } from './node-demos/node-044.js';
import { examples as topic45 } from './node-demos/node-045.js';
import { examples as topic46 } from './node-demos/node-046.js';

const topics: ReadonlyArray<ReadonlyArray<(input: string) => unknown>> = [
  topic1, topic2, topic3, topic4, topic5, topic6,
  topic7, topic8, topic9, topic10, topic11, topic12,
  topic13, topic14, topic15, topic16, topic17, topic18,
  topic19, topic20, topic21, topic22, topic23, topic24,
  topic25, topic26, topic27, topic28, topic29, topic30,
  topic31, topic32, topic33, topic34, topic35, topic36,
  topic37, topic38, topic39, topic40, topic41, topic42,
  topic43, topic44, topic45, topic46,
];

export function createNodeLabRouter() {
  const router = Router();
  let active = 0;
  router.post('/:example', async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    const match = /^node-(\d{3})\.e(\d{2})$/.exec(request.params.example);
    const demo = match ? topics[Number(match[1]) - 1]?.[Number(match[2]) - 1] : undefined;
    if (!demo) throw new HttpError(404, 'NODE_DEMO_NOT_FOUND', 'Unknown Node.js demo.');
    const body: unknown = request.body;
    if (!body || typeof body !== 'object' || Object.keys(body).length !== 1 ||
      !('input' in body) || typeof body.input !== 'string' || body.input.length > 120) {
      throw new HttpError(400, 'INVALID_NODE_INPUT', 'Supply an input string up to 120 characters.');
    }
    if (active >= 4) throw new HttpError(429, 'NODE_LAB_BUSY', 'All Node.js lab slots are in use. Try again shortly.');
    active++;
    try {
      const data = await demo(body.input);
      response.json({ data });
    } catch {
      throw new HttpError(422, 'NODE_DEMO_FAILED', 'The Node.js demo could not complete with that input.');
    } finally { active--; }
  });
  return router;
}
