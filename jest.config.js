export default {
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
        useESM: true,
      },
    ],
  },

  moduleNameMapper: {
    "^../utils/env$": "<rootDir>/src/tests/mocks/env.ts",
    "^src/utils/env$": "<rootDir>/src/tests/mocks/env.ts",
    "^.+/utils/env$": "<rootDir>/src/tests/mocks/env.ts",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
