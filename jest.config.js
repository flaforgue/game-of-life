/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testPathIgnorePatterns: ['dist/'],
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};