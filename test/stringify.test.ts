import parse, { Environment } from "../";

const cases: [string, Environment, string][] = [
  ["$BOB", { BOB: "hey  there" }, "hey  there"],
  [" $BOB\t", { BOB: "hey  there" }, "hey  there"],
  ["${ BOB\t}", { BOB: "hey  there" }, "hey  there"],

  ["'$BOB'", { BOB: "hey  there" }, "hey  there"],
  ["' $BOB\t'", { BOB: "hey  there" }, " hey  there\t"],
  ["'${ BOB\t}'", { BOB: "hey  there" }, "hey  there"],
  ['"$BOB"', { BOB: "hey  there" }, "hey  there"],
  ['" $BOB\t"', { BOB: "hey  there" }, " hey  there\t"],
  ['"${ BOB\t}"', { BOB: "hey  there" }, "hey  there"],

  ["${BOB:-default value}", {}, "default value"],
  ["${BOB:- default value\t}", {}, "default value"],
  ["${BOB:-' default value\t'}", {}, " default value\t"]
];

cases.forEach(testCase => {
  const [text, env, expected] = testCase;
  it(`Should replace: ${text} -> ${expected}`, () => {
    const parsed = parse(text);
    const actual = parsed.stringify(env);
    expect(actual).toEqual(expected);
  });
});
