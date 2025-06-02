export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  "jest": {
    "preset": "ts-jest/presets/default-esm",
    "globals": {
      "ts-jest": {
        "useESM": true,
        "tsconfig": "tsconfig.json"
      }
    },
    "transform": {}
  }
};