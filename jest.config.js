/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
     preset: "ts-jest",
     testEnvironment: "node",
     verbose: true,
     clearMocks: true,
     resetMocks: true,
     restoreMocks: true,
     testMatch: ["**/**/*.spec.ts", "**/**/*.test.ts"],
};
