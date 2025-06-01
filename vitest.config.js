// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // use 'jsdom' for frontend
    globals: true,       // enables global `describe`, `it`, etc.
    //setupFiles: ['./vitest.setup.js'], // if you need custom setup
  },
});
