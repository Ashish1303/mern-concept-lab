import { Router } from 'express';
import { HttpError } from '../middleware/errors.js';
import { exercise } from './express-tools.js';
import type { Demo } from './express-tools.js';
import { examples as topic1 } from './express-demos/express-001.js';
import { examples as topic2 } from './express-demos/express-002.js';
import { examples as topic3 } from './express-demos/express-003.js';
import { examples as topic4 } from './express-demos/express-004.js';
import { examples as topic5 } from './express-demos/express-005.js';
import { examples as topic6 } from './express-demos/express-006.js';
import { examples as topic7 } from './express-demos/express-007.js';
import { examples as topic8 } from './express-demos/express-008.js';
import { examples as topic9 } from './express-demos/express-009.js';
import { examples as topic10 } from './express-demos/express-010.js';
import { examples as topic11 } from './express-demos/express-011.js';
import { examples as topic12 } from './express-demos/express-012.js';
import { examples as topic13 } from './express-demos/express-013.js';
import { examples as topic14 } from './express-demos/express-014.js';
import { examples as topic15 } from './express-demos/express-015.js';
import { examples as topic16 } from './express-demos/express-016.js';
import { examples as topic17 } from './express-demos/express-017.js';
import { examples as topic18 } from './express-demos/express-018.js';
import { examples as topic19 } from './express-demos/express-019.js';
import { examples as topic20 } from './express-demos/express-020.js';
import { examples as topic21 } from './express-demos/express-021.js';
import { examples as topic22 } from './express-demos/express-022.js';
import { examples as topic23 } from './express-demos/express-023.js';
import { examples as topic24 } from './express-demos/express-024.js';
import { examples as topic25 } from './express-demos/express-025.js';
import { examples as topic26 } from './express-demos/express-026.js';
import { examples as topic27 } from './express-demos/express-027.js';
import { examples as topic28 } from './express-demos/express-028.js';
import { examples as topic29 } from './express-demos/express-029.js';
import { examples as topic30 } from './express-demos/express-030.js';
import { examples as topic31 } from './express-demos/express-031.js';
import { examples as topic32 } from './express-demos/express-032.js';
import { examples as topic33 } from './express-demos/express-033.js';
import { examples as topic34 } from './express-demos/express-034.js';
import { examples as topic35 } from './express-demos/express-035.js';
import { examples as topic36 } from './express-demos/express-036.js';
import { examples as topic37 } from './express-demos/express-037.js';

const demos = new Map<string, Demo>([
  ['express-001.e01', topic1[0]!],
  ['express-001.e02', topic1[1]!],
  ['express-038.e01', topic1[2]!],
  ['express-002.e01', topic2[0]!],
  ['express-002.e02', topic2[1]!],
  ['express-003.e01', topic3[0]!],
  ['express-003.e02', topic3[1]!],
  ['express-004.e01', topic4[0]!],
  ['express-004.e02', topic4[1]!],
  ['express-005.e01', topic5[0]!],
  ['express-005.e02', topic5[1]!],
  ['express-006.e01', topic6[0]!],
  ['express-006.e02', topic6[1]!],
  ['express-007.e01', topic7[0]!],
  ['express-007.e02', topic7[1]!],
  ['express-040.e01', topic7[2]!],
  ['express-008.e01', topic8[0]!],
  ['express-008.e02', topic8[1]!],
  ['express-041.e01', topic8[2]!],
  ['express-009.e01', topic9[0]!],
  ['express-009.e02', topic9[1]!],
  ['express-010.e01', topic10[0]!],
  ['express-010.e02', topic10[1]!],
  ['express-011.e01', topic11[0]!],
  ['express-011.e02', topic11[1]!],
  ['express-039.e01', topic11[2]!],
  ['express-012.e01', topic12[0]!],
  ['express-012.e02', topic12[1]!],
  ['express-012.e03', topic12[2]!],
  ['express-012.e04', topic12[3]!],
  ['express-012.e05', topic12[4]!],
  ['express-013.e01', topic13[0]!],
  ['express-013.e02', topic13[1]!],
  ['express-014.e01', topic14[0]!],
  ['express-014.e02', topic14[1]!],
  ['express-015.e01', topic15[0]!],
  ['express-015.e02', topic15[1]!],
  ['express-015.e03', topic15[2]!],
  ['express-015.e04', topic15[3]!],
  ['express-015.e05', topic15[4]!],
  ['express-043.e01', topic15[5]!],
  ['express-016.e01', topic16[0]!],
  ['express-016.e02', topic16[1]!],
  ['express-016.e03', topic16[2]!],
  ['express-016.e04', topic16[3]!],
  ['express-016.e05', topic16[4]!],
  ['express-017.e01', topic17[0]!],
  ['express-017.e02', topic17[1]!],
  ['express-017.e03', topic17[2]!],
  ['express-017.e04', topic17[3]!],
  ['express-017.e05', topic17[4]!],
  ['express-018.e01', topic18[0]!],
  ['express-018.e02', topic18[1]!],
  ['express-019.e01', topic19[0]!],
  ['express-019.e02', topic19[1]!],
  ['express-046.e01', topic19[2]!],
  ['express-020.e01', topic20[0]!],
  ['express-020.e02', topic20[1]!],
  ['express-047.e01', topic20[2]!],
  ['express-021.e01', topic21[0]!],
  ['express-021.e02', topic21[1]!],
  ['express-022.e01', topic22[0]!],
  ['express-022.e02', topic22[1]!],
  ['express-022.e03', topic22[2]!],
  ['express-022.e04', topic22[3]!],
  ['express-022.e05', topic22[4]!],
  ['express-044.e01', topic22[5]!],
  ['express-023.e01', topic23[0]!],
  ['express-023.e02', topic23[1]!],
  ['express-045.e01', topic23[2]!],
  ['express-024.e01', topic24[0]!],
  ['express-024.e02', topic24[1]!],
  ['express-025.e01', topic25[0]!],
  ['express-025.e02', topic25[1]!],
  ['express-042.e01', topic25[2]!],
  ['express-026.e01', topic26[0]!],
  ['express-026.e02', topic26[1]!],
  ['express-027.e01', topic27[0]!],
  ['express-027.e02', topic27[1]!],
  ['express-028.e01', topic28[0]!],
  ['express-028.e02', topic28[1]!],
  ['express-049.e01', topic28[2]!],
  ['express-029.e01', topic29[0]!],
  ['express-029.e02', topic29[1]!],
  ['express-030.e01', topic30[0]!],
  ['express-030.e02', topic30[1]!],
  ['express-031.e01', topic31[0]!],
  ['express-031.e02', topic31[1]!],
  ['express-032.e01', topic32[0]!],
  ['express-032.e02', topic32[1]!],
  ['express-048.e01', topic32[2]!],
  ['express-033.e01', topic33[0]!],
  ['express-033.e02', topic33[1]!],
  ['express-034.e01', topic34[0]!],
  ['express-034.e02', topic34[1]!],
  ['express-035.e01', topic35[0]!],
  ['express-035.e02', topic35[1]!],
  ['express-036.e01', topic36[0]!],
  ['express-036.e02', topic36[1]!],
  ['express-050.e01', topic36[2]!],
  ['express-037.e01', topic37[0]!],
  ['express-037.e02', topic37[1]!],
]);

export function createExpressLabRouter() {
  const router = Router();
  let active = 0;
  router.post('/:id', async (req, res) => {
    res.set('Cache-Control', 'no-store');
    const demo = demos.get(req.params.id);
    if (!demo) throw new HttpError(404, 'EXPRESS_DEMO_NOT_FOUND', 'Unknown Express demo.');
    const input: unknown = req.body;
    if (!input || typeof input !== 'object' || Object.keys(input).length !== 1 ||
        !('input' in input) || typeof input.input !== 'string' || input.input.length > 120) {
      throw new HttpError(400, 'INVALID_EXPRESS_INPUT', 'Supply an input string up to 120 characters.');
    }
    if (active >= 4) throw new HttpError(429, 'EXPRESS_LAB_BUSY', 'All Express lab slots are in use. Try again shortly.');
    active++;
    try { res.json({ data: await exercise(demo, input.input) }); }
    catch { throw new HttpError(422, 'EXPRESS_DEMO_FAILED', 'This input could not complete the Express demo.'); }
    finally { active--; }
  });
  return router;
}
