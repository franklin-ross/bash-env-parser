const {
  collapseWhitespace,
  Variable: Var,
  VariableAssignment: VarAssign,
  Whitespace: Ws,
  Word: W
} = require("../../");

describe("transforms.collapseWhitespace", () => {
  it("returns null for whitespace token", () => {
    const collapsed = collapseWhitespace(new Ws("   "));
    expect(collapsed).toBeNull();
  });

  it("removes whitespace", () => {
    const collapsed = collapseWhitespace([new Ws("   "), new Ws("   ")]);
    expect(collapsed).toMatchObject([]);
  });

  it("removes leading whitespace", () => {
    const collapsed = collapseWhitespace([
      new Ws("   "),
      new Ws("   "),
      new W("a")
    ]);
    expect(collapsed).toMatchObject([new W("a")]);
  });

  it("removes trailing whitespace", () => {
    const collapsed = collapseWhitespace([
      new W("a"),
      new Ws("   "),
      new Ws("   ")
    ]);
    expect(collapsed).toMatchObject([new W("a")]);
  });

  it("collapses internal whitespace", () => {
    const collapsed = collapseWhitespace([
      new W("a"),
      new Ws("   "),
      new Ws("   "),
      new W("b")
    ]);
    expect(collapsed).toMatchObject([new W("a"), new Ws(" "), new W("b")]);
  });

  it("doesn't recurse into children", () => {
    const collapsed = collapseWhitespace([new Var("v", ":-", [new Ws("   ")])]);
    expect(collapsed).toMatchObject([new Var("v", ":-", [new Ws("   ")])]);
  });

  it("collapses whitespace correctly around variables", () => {
    const collapsed = collapseWhitespace([
      new W("a"),
      new Ws("   "),
      new Var("v"),
      new Ws("   "),
      new W("b")
    ]);
    expect(collapsed).toMatchObject([
      new W("a"),
      new Ws(" "),
      new Var("v"),
      new Ws(" "),
      new W("b")
    ]);
  });

  it("strings count as tokens", () => {
    const collapsed = collapseWhitespace([
      new Ws("   "),
      "a",
      new Ws("   "),
      new Var("v"),
      new Ws("   "),
      "d",
      new Ws("   ")
    ]);
    expect(collapsed).toMatchObject([
      "a",
      new Ws(" "),
      new Var("v"),
      new Ws(" "),
      "d"
    ]);
  });
});
