/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom", // Simulates a browser environment
    transform: {
      "^.+\\.tsx?$": "ts-jest", // Transpiles TypeScript
      "^.+\\.jsx?$": "babel-jest", // Transpiles JS/JSX
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mocks styles
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Setup file
  };