const {
  parse,
  VariableAssignment,
  Variable,
  Word,
  List,
  QuotedString,
  VerbatimString,
  TokenKind
} = require("../../");

describe("tokens.VariableAssignment", () => {
  describe("parses", () => {
    const tests = [
      ["VAR=hello", new VariableAssignment("VAR", new Word("hello"))],
      [
        'VAR="hel"lo',
        new VariableAssignment(
          "VAR",
          new List([new QuotedString(["hel"]), new Word("lo")])
        )
      ],
      [
        "VAR='hello'",
        new VariableAssignment("VAR", new VerbatimString("hello"))
      ],
      ["VAR=$BOB", new VariableAssignment("VAR", new Variable("BOB"))],
      [
        'VAR="a$BOB"',
        new VariableAssignment(
          "VAR",
          new QuotedString(["a", new Variable("BOB")])
        )
      ]
    ];
    tests.forEach(([expression, result]) =>
      it(expression, () => {
        const parsed = parse(expression);
        expect(parsed).toEqual(new List([result]));
      })
    );
  });

  describe("doesn't parse", () => {
    const tests = ["VAR= hello", "VAR =hello"];
    tests.forEach(expression =>
      it(expression, () => {
        const parsed = parse(expression);
        expect(parsed.items.map(x => x.kind)).not.toContain(
          TokenKind.VariableAssignment
        );
      })
    );
  });
});
