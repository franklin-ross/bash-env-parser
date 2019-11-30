import bashEcho from "./bash-echo";
import parse from "../";
import { Environment } from "../src/tokens";

const env = {
  WORD: "hello",
  INTERNAL_SPACES: "hello with internal   spaces",
  SPACES: " hello with   spaces  "
};

describe("output matches bash", () => {
  const fallbackCases = ["", "fallback", "fallback with   spaces"];
  const cases = [
    ...variablePermutations("WORD", fallbackCases),
    ...variablePermutations("INTERNAL_SPACES", fallbackCases),
    ...variablePermutations("SPACES", fallbackCases)
  ];
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
  const results = [
    ...quotePermutations("$" + variable),
    ...quotePermutations("${" + variable + "}")
  ];
  for (const fallback of fallbacks) {
    results.push(...quotePermutations("${" + variable + ":-" + fallback + "}"));
  }
  return results;
}

function quotePermutations(text: string) {
  return [text, '"' + text + '"', "'" + text + "'"];
}
