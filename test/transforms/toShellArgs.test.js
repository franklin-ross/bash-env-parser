const {
  toShellArgs,
  SubstitutedVariable: SubVar,
  Variable: Var,
  VariableAssignment: VarAssign,
  Word: W,
  List: L,
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
      [new W("a"), new Ws(" "), new SubVar("V", null), new Ws(" "), new W("b")],
      ["a", "b"]
    ],
    [
      [
        new W("a"),
        new Ws(" "),
        new SubVar("V", [new SubVar("X", new W("c"))]),
        new Ws(" "),
        new W("b")
      ],
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
    [
      [new VarAssign("V", [new QS(["x"])]), new Ws(" "), new W("b")],
      ["V=x", "b"] // I don't know whether variable assignments should show up.
    ]
  ];

  tests.forEach(([ast, result]) =>
    it(ast.toString(), () => {
      const args = toShellArgs(ast);
      expect(args).toEqual(result);
    })
  );
});
