import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => { cleanup(); });

// Lazy implementation/source modules may require a cold transform in Vitest.
configure({ asyncUtilTimeout: 5000 });
