const {
  substitute,
  Variable: Var,
  VariableAssignment: VarAssign,
  Whitespace: Ws,
  Word: W
} = require("../../");

describe("transforms.substitute", () => {
  const env = {
    WORD: "word"
  };

  describe("without local assignment", () => {
    const tests = [
      [new Var("WORD"), new W("word")],
      [
        [new W("a"), new Var("WORD")],
        [new W("a"), new W("word")]
      ],
      [new Var("NONE"), null],
      [
        [new VarAssign("VAR", new W("value")), new Ws(" "), new Var("VAR")],
        [new VarAssign("VAR", new W("value")), new Ws(" ")]
      ]
    ];

    tests.forEach(([ast, result]) =>
      it(ast.toString(), () => {
        const substituted = substitute(ast, env, false);
        expect(substituted).toEqual(result);
      })
    );
  });

  describe("with local assignment", () => {
    const tests = [
      [
        [new VarAssign("VAR", new W("value")), new Ws(" "), new Var("VAR")],
        [new VarAssign("VAR", new W("value")), new Ws(" "), new W("value")]
      ],
      [
        [new VarAssign("VAR", new Var("WORD")), new Ws(" "), new Var("VAR")],
        [new VarAssign("VAR", new W("word")), new Ws(" "), new W("word")]
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
