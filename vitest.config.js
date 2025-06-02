// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    environmentMatchGlobs: [
      // Use jsdom for all client tests
      ['**/client/src/**/*.test.{js,ts}', 'jsdom'],
      ['**/client/tests/**/*.test.{js,ts}', 'jsdom'],
      // Use node for everything else (default)
    ],
  },
});
