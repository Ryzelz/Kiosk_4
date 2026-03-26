/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testMatch: ['**/tests/**/*.test.[jt]s'],
  // Treat .ts files as CJS for testing (babel strips types and compiles to CJS)
  extensionsToTreatAsEsm: [],
};
