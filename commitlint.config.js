module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "major",
        "minor",
        "patch",
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "header-max-length": [2, "always", 100],
  },
  // This pattern enforces: type(scope?): emoji subject
};
