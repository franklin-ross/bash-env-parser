const {
  extractEnvironment,
  Variable: Var,
  VariableAssignment: VarAssign,
  Word: W,
  VerbatimString: VS
} = require("../../");

describe("transforms.extractEnvironment", () => {
  const env = {
    WORD: "word"
  };

  const tests = [
    [[new VarAssign("VAR", new W("value"))], { VAR: "value" }],
    [[new VarAssign("VAR", new Var("WORD"))], { VAR: env.WORD }],
    [[new VarAssign("VAR", new VS(" "))], { VAR: " " }],
    [[new VarAssign("VAR", null)], {}],
    [[new VarAssign("VAR", new Var("EMPTY"))], {}],
    [[new VarAssign("VAR", new W(""))], {}],
    [[new VarAssign("VAR", new VS(""))], {}]
  ];

  tests.forEach(([ast, result]) =>
    it(ast.toString(), () => {
      const environment = extractEnvironment(ast, Object.create(env));
      expect(environment).toEqual(result);
    })
  );
});
