const {
  toShellArgs,
  Variable: Var,
  VariableAssignment: VarAssign,
  Word: W,
  QuotedString: QS,
  VerbatimString: VS,
  Whitespace: Ws
} = require("../../");

describe("transforms.toShellArgs", () => {
  const tests = [
    [
      [new W("a"), new Ws(" "), new W("b")],
      ["a", "b"]
    ],
    [
      [new W("a"), new Ws(" "), new Ws(" "), new W("b")],
      ["a", "b"]
    ],
    [
      [new W("a"), new Ws(" "), new W("c"), new Ws(" "), new W("b")],
      ["a", "c", "b"]
    ],
    [
      [
        new W("a"),
        new Ws(" "),
        new Var("V", ":-", [new W("c")]),
        new Ws(" "),
        new W("b")
      ],
      ["a", "b"]
    ],
    [
      [new QS(["a"]), new Ws(" "), new VS("b")],
      ["a", "b"]
    ],
    [[new VarAssign("V", [new QS(["x"])]), new Ws(" "), new W("b")], ["b"]]
  ];

  tests.forEach(([ast, result]) =>
    it(ast.toString(), () => {
      const args = toShellArgs(ast);
      expect(args).toEqual(result);
    })
  );
});
