import { Router } from 'express';
import { HttpError } from '../middleware/errors.js';
import { exerciseMongo } from './mongo-tools.js';
import type { Demo } from './mongo-tools.js';
import { examples as topic1 } from './mongo-demos/mongodb-001.js';
import { examples as topic2 } from './mongo-demos/mongodb-002.js';
import { examples as topic3 } from './mongo-demos/mongodb-003.js';
import { examples as topic4 } from './mongo-demos/mongodb-004.js';
import { examples as topic5 } from './mongo-demos/mongodb-005.js';
import { examples as topic6 } from './mongo-demos/mongodb-006.js';
import { examples as topic7 } from './mongo-demos/mongodb-007.js';
import { examples as topic8 } from './mongo-demos/mongodb-008.js';
import { examples as topic9 } from './mongo-demos/mongodb-009.js';
import { examples as topic10 } from './mongo-demos/mongodb-010.js';
import { examples as topic11 } from './mongo-demos/mongodb-011.js';
import { examples as topic12 } from './mongo-demos/mongodb-012.js';
import { examples as topic13 } from './mongo-demos/mongodb-013.js';
import { examples as topic14 } from './mongo-demos/mongodb-014.js';
import { examples as topic15 } from './mongo-demos/mongodb-015.js';
import { examples as topic16 } from './mongo-demos/mongodb-016.js';
import { examples as topic17 } from './mongo-demos/mongodb-017.js';
import { examples as topic18 } from './mongo-demos/mongodb-018.js';
import { examples as topic19 } from './mongo-demos/mongodb-019.js';
import { examples as topic20 } from './mongo-demos/mongodb-020.js';
import { examples as topic21 } from './mongo-demos/mongodb-021.js';
import { examples as topic22 } from './mongo-demos/mongodb-022.js';
import { examples as topic23 } from './mongo-demos/mongodb-023.js';
import { examples as topic24 } from './mongo-demos/mongodb-024.js';
import { examples as topic25 } from './mongo-demos/mongodb-025.js';
import { examples as topic26 } from './mongo-demos/mongodb-026.js';
import { examples as topic27 } from './mongo-demos/mongodb-027.js';
import { examples as topic28 } from './mongo-demos/mongodb-028.js';
import { examples as topic29 } from './mongo-demos/mongodb-029.js';
import { examples as topic30 } from './mongo-demos/mongodb-030.js';
import { examples as topic31 } from './mongo-demos/mongodb-031.js';
import { examples as topic32 } from './mongo-demos/mongodb-032.js';
import { examples as topic33 } from './mongo-demos/mongodb-033.js';
import { examples as topic34 } from './mongo-demos/mongodb-034.js';
import { examples as topic35 } from './mongo-demos/mongodb-035.js';
import { examples as topic36 } from './mongo-demos/mongodb-036.js';
import { examples as topic37 } from './mongo-demos/mongodb-037.js';
import { examples as topic38 } from './mongo-demos/mongodb-038.js';
import { examples as topic39 } from './mongo-demos/mongodb-039.js';
import { examples as topic40 } from './mongo-demos/mongodb-040.js';
import { examples as topic41 } from './mongo-demos/mongodb-041.js';
import { examples as topic42 } from './mongo-demos/mongodb-042.js';
import { examples as topic43 } from './mongo-demos/mongodb-043.js';
import { examples as topic44 } from './mongo-demos/mongodb-044.js';
import { examples as topic45 } from './mongo-demos/mongodb-045.js';
import { examples as topic46 } from './mongo-demos/mongodb-046.js';
import { examples as topic47 } from './mongo-demos/mongodb-047.js';
import { examples as topic48 } from './mongo-demos/mongodb-048.js';
import { examples as topic49 } from './mongo-demos/mongodb-049.js';
import { examples as topic50 } from './mongo-demos/mongodb-050.js';
import { examples as topic51 } from './mongo-demos/mongodb-051.js';
import { examples as topic52 } from './mongo-demos/mongodb-052.js';
import { examples as topic53 } from './mongo-demos/mongodb-053.js';
import { examples as topic54 } from './mongo-demos/mongodb-054.js';
import { examples as topic55 } from './mongo-demos/mongodb-055.js';
import { examples as topic56 } from './mongo-demos/mongodb-056.js';
import { examples as topic57 } from './mongo-demos/mongodb-057.js';
import { examples as topic58 } from './mongo-demos/mongodb-058.js';
import { examples as topic59 } from './mongo-demos/mongodb-059.js';

const demos = new Map<string, Demo>([
  ['mongodb-001.e01', topic1[0]!],
  ['mongodb-001.e02', topic1[1]!],
  ['mongodb-002.e01', topic2[0]!],
  ['mongodb-002.e02', topic2[1]!],
  ['mongodb-003.e01', topic3[0]!],
  ['mongodb-003.e02', topic3[1]!],
  ['mongodb-004.e01', topic4[0]!],
  ['mongodb-004.e02', topic4[1]!],
  ['mongodb-005.e01', topic5[0]!],
  ['mongodb-005.e02', topic5[1]!],
  ['mongodb-006.e01', topic6[0]!],
  ['mongodb-006.e02', topic6[1]!],
  ['mongodb-007.e01', topic7[0]!],
  ['mongodb-007.e02', topic7[1]!],
  ['mongodb-061.e01', topic7[2]!],
  ['mongodb-008.e01', topic8[0]!],
  ['mongodb-008.e02', topic8[1]!],
  ['mongodb-009.e01', topic9[0]!],
  ['mongodb-009.e02', topic9[1]!],
  ['mongodb-060.e01', topic9[2]!],
  ['mongodb-010.e01', topic10[0]!],
  ['mongodb-010.e02', topic10[1]!],
  ['mongodb-011.e01', topic11[0]!],
  ['mongodb-011.e02', topic11[1]!],
  ['mongodb-062.e01', topic11[2]!],
  ['mongodb-012.e01', topic12[0]!],
  ['mongodb-012.e02', topic12[1]!],
  ['mongodb-013.e01', topic13[0]!],
  ['mongodb-013.e02', topic13[1]!],
  ['mongodb-063.e01', topic13[2]!],
  ['mongodb-014.e01', topic14[0]!],
  ['mongodb-014.e02', topic14[1]!],
  ['mongodb-015.e01', topic15[0]!],
  ['mongodb-015.e02', topic15[1]!],
  ['mongodb-064.e01', topic15[2]!],
  ['mongodb-016.e01', topic16[0]!],
  ['mongodb-016.e02', topic16[1]!],
  ['mongodb-017.e01', topic17[0]!],
  ['mongodb-017.e02', topic17[1]!],
  ['mongodb-018.e01', topic18[0]!],
  ['mongodb-018.e02', topic18[1]!],
  ['mongodb-019.e01', topic19[0]!],
  ['mongodb-019.e02', topic19[1]!],
  ['mongodb-065.e01', topic19[2]!],
  ['mongodb-020.e01', topic20[0]!],
  ['mongodb-020.e02', topic20[1]!],
  ['mongodb-021.e01', topic21[0]!],
  ['mongodb-021.e02', topic21[1]!],
  ['mongodb-066.e01', topic21[2]!],
  ['mongodb-022.e01', topic22[0]!],
  ['mongodb-022.e02', topic22[1]!],
  ['mongodb-023.e01', topic23[0]!],
  ['mongodb-023.e02', topic23[1]!],
  ['mongodb-069.e01', topic23[2]!],
  ['mongodb-024.e01', topic24[0]!],
  ['mongodb-024.e02', topic24[1]!],
  ['mongodb-025.e01', topic25[0]!],
  ['mongodb-025.e02', topic25[1]!],
  ['mongodb-026.e01', topic26[0]!],
  ['mongodb-026.e02', topic26[1]!],
  ['mongodb-068.e01', topic26[2]!],
  ['mongodb-027.e01', topic27[0]!],
  ['mongodb-027.e02', topic27[1]!],
  ['mongodb-028.e01', topic28[0]!],
  ['mongodb-028.e02', topic28[1]!],
  ['mongodb-029.e01', topic29[0]!],
  ['mongodb-029.e02', topic29[1]!],
  ['mongodb-073.e01', topic29[2]!],
  ['mongodb-030.e01', topic30[0]!],
  ['mongodb-030.e02', topic30[1]!],
  ['mongodb-030.e03', topic30[2]!],
  ['mongodb-030.e04', topic30[3]!],
  ['mongodb-030.e05', topic30[4]!],
  ['mongodb-071.e01', topic30[5]!],
  ['mongodb-031.e01', topic31[0]!],
  ['mongodb-031.e02', topic31[1]!],
  ['mongodb-032.e01', topic32[0]!],
  ['mongodb-032.e02', topic32[1]!],
  ['mongodb-033.e01', topic33[0]!],
  ['mongodb-033.e02', topic33[1]!],
  ['mongodb-034.e01', topic34[0]!],
  ['mongodb-034.e02', topic34[1]!],
  ['mongodb-072.e01', topic34[2]!],
  ['mongodb-035.e01', topic35[0]!],
  ['mongodb-035.e02', topic35[1]!],
  ['mongodb-036.e01', topic36[0]!],
  ['mongodb-036.e02', topic36[1]!],
  ['mongodb-037.e01', topic37[0]!],
  ['mongodb-037.e02', topic37[1]!],
  ['mongodb-038.e01', topic38[0]!],
  ['mongodb-038.e02', topic38[1]!],
  ['mongodb-074.e01', topic38[2]!],
  ['mongodb-039.e01', topic39[0]!],
  ['mongodb-039.e02', topic39[1]!],
  ['mongodb-040.e01', topic40[0]!],
  ['mongodb-040.e02', topic40[1]!],
  ['mongodb-041.e01', topic41[0]!],
  ['mongodb-041.e02', topic41[1]!],
  ['mongodb-042.e01', topic42[0]!],
  ['mongodb-042.e02', topic42[1]!],
  ['mongodb-043.e01', topic43[0]!],
  ['mongodb-043.e02', topic43[1]!],
  ['mongodb-044.e01', topic44[0]!],
  ['mongodb-044.e02', topic44[1]!],
  ['mongodb-045.e01', topic45[0]!],
  ['mongodb-045.e02', topic45[1]!],
  ['mongodb-046.e01', topic46[0]!],
  ['mongodb-046.e02', topic46[1]!],
  ['mongodb-067.e01', topic46[2]!],
  ['mongodb-047.e01', topic47[0]!],
  ['mongodb-047.e02', topic47[1]!],
  ['mongodb-048.e01', topic48[0]!],
  ['mongodb-048.e02', topic48[1]!],
  ['mongodb-049.e01', topic49[0]!],
  ['mongodb-049.e02', topic49[1]!],
  ['mongodb-050.e01', topic50[0]!],
  ['mongodb-050.e02', topic50[1]!],
  ['mongodb-051.e01', topic51[0]!],
  ['mongodb-051.e02', topic51[1]!],
  ['mongodb-051.e03', topic51[2]!],
  ['mongodb-051.e04', topic51[3]!],
  ['mongodb-051.e05', topic51[4]!],
  ['mongodb-052.e01', topic52[0]!],
  ['mongodb-052.e02', topic52[1]!],
  ['mongodb-070.e01', topic52[2]!],
  ['mongodb-053.e01', topic53[0]!],
  ['mongodb-053.e02', topic53[1]!],
  ['mongodb-054.e01', topic54[0]!],
  ['mongodb-054.e02', topic54[1]!],
  ['mongodb-055.e01', topic55[0]!],
  ['mongodb-055.e02', topic55[1]!],
  ['mongodb-056.e01', topic56[0]!],
  ['mongodb-056.e02', topic56[1]!],
  ['mongodb-057.e01', topic57[0]!],
  ['mongodb-057.e02', topic57[1]!],
  ['mongodb-058.e01', topic58[0]!],
  ['mongodb-058.e02', topic58[1]!],
  ['mongodb-059.e01', topic59[0]!],
  ['mongodb-059.e02', topic59[1]!],
]);

export function createMongoLabRouter(port?: number) {
  const router = Router();
  let active = 0;
  router.post('/:id', async (req, res) => {
    res.set('Cache-Control', 'no-store');
    const demo = demos.get(req.params.id);
    if (!demo) throw new HttpError(404, 'DB_DEMO_NOT_FOUND', 'Unknown database demo.');
    const body: unknown = req.body;
    if (!body || typeof body !== 'object' || Object.keys(body).length !== 1 ||
        !('input' in body) || typeof body.input !== 'string' || body.input.length > 120) {
      throw new HttpError(400, 'INVALID_DB_INPUT', 'Supply an input string up to 120 characters.');
    }
    if (!port) throw new HttpError(503, 'DB_LAB_DISABLED', 'Configure MONGO_LAB_PORT for the dedicated local mernLab replica set.');
    if (active >= 4) throw new HttpError(429, 'DB_LAB_BUSY', 'All database lab slots are in use. Try again shortly.');
    active++;
    try { res.json({ data: await exerciseMongo(port, demo, body.input) }); }
    catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(422, 'DB_DEMO_FAILED', 'The database demo could not complete.');
    } finally { active--; }
  });
  return router;
}
