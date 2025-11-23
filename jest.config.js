export default {
  testEnvironment: "jsdom",
  transform: {},
  collectCoverage: true,
  collectCoverageFrom: [
    "js/**/*.js",
    "!js/main.js" // opcional, para no cubrir el main
  ],
  coverageDirectory: "coverage",
};
