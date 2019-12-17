const {
  substitute,
  SubstitutedVariable: SubVar,
  Variable: Var,
  VariableAssignment: VarAssign,
  Whitespace: Ws,
  Word: W,
  VerbatimString: Vs,
  List: L
} = require("../../");

describe("transforms.substitute", () => {
  const env = {
    WORD: "word"
  };

  describe("without local assignment", () => {
    const tests = [
      [new Var("WORD"), new SubVar("WORD", "word")],
      [
        new L([new W("a"), new Var("WORD")]),
        new L([new W("a"), new SubVar("WORD", "word")])
      ],
      [new Var("NONE"), new SubVar("NONE", null)],
      [
        new L([
          new VarAssign("VAR", new W("value")),
          new Ws(" "),
          new Var("VAR")
        ]),
        new L([
          new VarAssign("VAR", new Vs("value")),
          new Ws(" "),
          new SubVar("VAR", null)
        ])
      ]
    ];

    tests.forEach(([ast, result]) =>
      it(ast.toString(), () => {
        const substituted = substitute(ast, Object.create(env), false);
        expect(substituted).toEqual(result);
      })
    );
  });

  describe("with local assignment", () => {
    const tests = [
      [
        new L([
          new VarAssign("VAR", new W("value")),
          new Ws(" "),
          new Var("VAR")
        ]),
        new L([
          new VarAssign("VAR", new Vs("value")),
          new Ws(" "),
          new SubVar("VAR", "value")
        ])
      ],
      [
        new L([
          new VarAssign("VAR", new Var("WORD")),
          new Ws(" "),
          new Var("VAR")
        ]),
        new L([
          new VarAssign("VAR", new Vs("word")),
          new Ws(" "),
          new SubVar("VAR", "word")
        ])
      ]
    ];

    tests.forEach(([ast, result]) =>
      it(ast.toString(), () => {
        const substituted = substitute(ast, Object.create(env), true);
        expect(substituted).toEqual(result);
      })
    );
  });
});
