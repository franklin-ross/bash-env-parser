const {
  extractEnvironment,
  SubstitutedVariable: SubVar,
  Variable: Var,
  VariableAssignment: VarAssign,
  Whitespace: Ws,
  Word: W,
  VerbatimString: Vs,
  List: L
} = require("../../");

describe("transforms.extractEnvironment", () => {
  const env = {
    WORD: "word"
  };

  const tests = [
    [new L([new VarAssign("VAR", new W("value"))]), { VAR: "value" }],
    [new L([new VarAssign("VAR", new Var("WORD"))]), { VAR: env.WORD }],
    [
      new L([new VarAssign("VAR", new SubVar("WORD", "value"))]),
      { VAR: "value" }
    ]
  ];

  tests.forEach(([ast, result]) =>
    it(ast.toString(), () => {
      const environment = extractEnvironment(ast, Object.create(env));
      expect(environment).toEqual(result);
    })
  );
});
