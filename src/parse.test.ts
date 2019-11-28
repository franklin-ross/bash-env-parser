import parse from ".";
import { StringToken, VariableToken, Token, QuotedStringToken } from "./tokens";

const cases: [string, Token][] = [
  ["$BOB", new VariableToken("BOB")],
  ["${BOB}", new VariableToken("BOB")],
  [
    "${BOB:-default value}",
    new VariableToken("BOB", ":-", new StringToken(["default value"]))
  ],
  [
    "${BOB:=default value}",
    new VariableToken("BOB", ":=", new StringToken(["default value"]))
  ],
  [
    "prefix$BOB suffix",
    new StringToken(["prefix", new VariableToken("BOB"), " suffix"])
  ],
  [
    "${BOB:-' default value\t'}",
    new VariableToken(
      "BOB",
      ":-",
      new QuotedStringToken([" default value\t"], "'")
    )
  ]
];

cases.forEach(testCase => {
  const [text, expected] = testCase;
  it("Should parse: " + text, () => {
    const actual = parse(text);
    expect(actual).toEqual(expected);
  });
});
