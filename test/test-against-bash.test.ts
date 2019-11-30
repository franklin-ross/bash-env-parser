import bashEcho from "./bash-echo";
import parse from "../dist";
import { Environment } from "../src/tokens";

const env = {
  BOB: "hello",
  JILL: "there"
};

describe("output matches bash", () => {
  const cases = ["$BOB", "${JILL}", " $BOB\t", " $BOB\t", "'$BOB'"];
  cases.forEach(input => it(input, () => testAgainstBash(input, env)));
});

describe("bash has substitution failures", () => {
  const cases = ["${ BOB}", "${BOB\t}"];
  cases.forEach(input =>
    it(input, () => {
      expect(() => bashEcho(input, env)).toThrowError("bad substitution");
    })
  );
});

function testAgainstBash(input: string, env: Environment) {
  const bashOut = bashEcho(input, env);
  const parsed = parse(input);
  const output = parsed.stringify(env);
  expect(output).toBe(bashOut);
}
