module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ".*.pegjs$": "./ops/pegjs-transformer.js"
  }
};
