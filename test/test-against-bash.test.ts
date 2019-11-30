import bashEcho from "./bash-echo";
import parse from "../";
import { Environment } from "../src/tokens";

const env = {
  WORD: "variable",
  INTERNAL_SPACES: "variable with internal   spaces",
  OUTER_SPACES: " variable-with-outer-spaces    "
};

describe("output matches bash", () => {
  const fallbackCases = ["", "fallback", "fallback with   spaces"];
  const cases = flatten([
    Object.keys(env).map(name => variablePermutations(name, fallbackCases)),
    quotePermutations("concat$WORD"),
    quotePermutations("${NONE:-this   is ${NONE}}"),
    quotePermutations("${NONE:-this   is ${NONE:-   $WORD}}"),
    '${NONE:-   "  $INTERNAL_SPACES "}'
  ]);

  cases.forEach(input => it(input, () => testAgainstBash(input, env)));
});

describe("doesn't parse variables when bash has substitution failures", () => {
  const cases = ["${ BOB}", "${BOB\t}"];
  cases.forEach(input =>
    it(input, () =>
      expect(() => bashEcho(input, env)).toThrowError("bad substitution")
    )
  );
});

function testAgainstBash(input: string, env: Environment) {
  const bashOut = bashEcho(input, env);
  const parsed = parse(input);
  const output = parsed.stringify(env);
  expect(output).toBe(bashOut);
}

function variablePermutations(variable: string, fallbacks: string[]) {
  return [
    quotePermutations("$" + variable),
    quotePermutations("${" + variable + "}"),
    fallbacks.map(f => quotePermutations("${" + variable + ":-" + f + "}"))
  ];
}

function quotePermutations(text: string) {
  return [text, '"' + text + '"', "'" + text + "'"];
}

export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

function flatten(arr: RecursiveArray<string>): string[] {
  return arr.reduce(
    (acc: string[], val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
    []
  );
}
