import type { ExampleDefinition } from '../components/examples/ExampleFrame';
import interaction from './InteractionDemo.tsx?raw';
import health from './HealthDemo.tsx?raw';
import healthClient from '../services/health.ts?raw';
import healthRoute from '../../../server/src/routes/health.ts?raw';
import errors from '../../../server/src/middleware/errors.ts?raw';
import app from '../../../server/src/app.ts?raw';
import output from '../components/examples/OutputViewer.tsx?raw';

export const foundationExamples: ExampleDefinition[] = [
  {
    id: 'interaction', title: 'Local interaction',
    purpose: 'Verify that an action changes the rendered output and that the example can be reset. This is a foundation check; the full useState lesson belongs to Phase 3.',
    when: 'Checking that controls and output panels are connected.',
    avoid: 'Claiming coverage of batching, stale state or the full React state curriculum.',
    expected: 'Each click increases the visible count by one. Reset returns it to zero. Refreshing or switching examples starts a fresh check.',
    steps: ['The button event requests a state update using the previous value.', 'React renders the updated value inside the live output region.', 'Reset sets the value to zero. Switching examples unmounts this component.'],
    sources: [{ name: 'InteractionDemo.tsx', content: interaction }, { name: 'OutputViewer.tsx', content: output }],
    mistakes: [{ problem: 'Treating a successful counter as completion of a React topic.', fix: 'Keep this infrastructure check separate from syllabus acceptance. The full React curriculum remains Phase 3.' }],
    questions: [
      { id: 'foundation-local-1', level: 'Basic', question: 'What does this check verify?', answer: 'The rendered button handler, local state update, output region and reset behavior work together in the real browser.' },
      { id: 'foundation-local-2', level: 'Debugging', question: 'Should the count survive a page refresh?', answer: 'No. This check deliberately stores state only in the mounted component. The selected example survives through the URL, while its local state resets.' }
    ]
  },
  {
    id: 'api', title: 'Express API connection',
    purpose: 'Verify the full path from a browser action to a real Express route and back. The result is received from the server, never filled in as a sample response.',
    when: 'Checking server connectivity, the request contract and visible error handling.',
    avoid: 'Inferring database connectivity or authentication readiness from API liveness.',
    expected: 'Check API connection returns live JSON with a timestamp and request ID. The database field reads not_checked. Send invalid query returns HTTP 400. An unavailable server produces an error instead of a success result.',
    steps: ['The browser sends GET /api/v1/health through the development proxy or to the same production server.', 'Express validates the query, creates a live response and identifies the request.', 'The client validates the response shape and displays it. Reset cancels active work; requests time out after eight seconds.'],
    sources: [{ name: 'HealthDemo.tsx', content: health }, { name: 'services/health.ts', content: healthClient }, { name: 'server/routes/health.ts', content: healthRoute }, { name: 'server/middleware/errors.ts', content: errors }, { name: 'server/app.ts', content: app }, { name: 'OutputViewer.tsx', content: output }],
    mistakes: [{ problem: 'Assuming a healthy API means MongoDB is connected.', fix: 'Use the MERN runtime readiness demo to verify the separate database connection.' }, { problem: 'Passing arbitrary query parameters to the health endpoint.', fix: 'Use the documented query-free route. The invalid-query button reproduces a real rejection; the connection button sends the corrected request.' }],
    questions: [
      { id: 'foundation-api-1', level: 'Basic', question: 'Where does the displayed response come from?', answer: 'The local Express server creates it for the actual request. The frontend parses and validates the JSON before displaying it.' },
      { id: 'foundation-api-2', level: 'Debugging', question: 'Why does the invalid query return an error?', answer: 'This endpoint accepts no query parameters. Express rejects the request with HTTP 400 and the centralized error handler returns a public error message.' }
    ]
  }
];
