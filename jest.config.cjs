module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true
      }
    ],
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "svelte"
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};