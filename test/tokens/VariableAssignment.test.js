const {
  parse,
  VariableAssignment,
  Variable,
  Word,
  List,
  QuotedString,
  VerbatimString
} = require("../../");

describe("tokens.VariableAssignment", () => {
  describe("parses", () => {
    const tests = [
      ["VAR=hello", new VariableAssignment("VAR", new Word("hello"))],
      [
        'VAR="hello"',
        new VariableAssignment("VAR", new QuotedString(["hello"]))
      ],
      [
        "VAR='hello'",
        new VariableAssignment("VAR", new VerbatimString("hello"))
      ],
      ["VAR=$BOB", new VariableAssignment("VAR", new Variable("BOB"))]
    ];
    tests.forEach(([expression, result]) =>
      it(expression, () => {
        const parsed = parse(expression);
        expect(parsed).toEqual(new List([result]));
      })
    );
  });
});
