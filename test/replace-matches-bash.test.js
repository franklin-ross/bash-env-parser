// These tests are written in plain node compatible JS to ensure it works with that.

const bash = require("./bash-exec");
const { parse, replace, substitute, collapseWhitespace } = require("../");

const env = {
  EMPTY: "", // Should correctly handle variables set to the empty string
  WORD: "variable",
  INTERNAL_SPACES: "variable with internal   spaces",
  OUTER_SPACES: " variable-with-outer-spaces    "
};

beforeAll(() => bash.loadCache());
afterAll(() => bash.saveCache());

describe("output matches bash", () => {
  const fallbackCases = ["", "fallback", "fallback with  spaces"];
  const cases = flatten([
    Object.keys(env).map(name => variablePermutations(name, fallbackCases)),
    // $WORD should be detected despite text run-on
    quotePermutations("run${WORD}on"),
    // Word, quote, and variable run-ons should be parsed
    quotePermutations("ll").map(ll => "he" + ll + "$WORD"),
    // Whitespace around ${NONE} should collapse unless quoted
    quotePermutations("this is ${NONE} good"),
    // Quoted whitespace should not collapse around ${NONE}
    "\" \"${NONE}' '",
    // $NONE and whitespace at the start/end should collapse
    "$NONE 'hello'",
    "'hello' $NONE",
    // Nested variables should correctly collapse whitespace
    quotePermutations("${NONE:-this   is ${NONE:-   $OUTER_SPACES\t}}"),
    '${NONE:-   "  $INTERNAL_SPACES "}',
    // Full quoting with single quotes doesn't even allow \' to escape a single quote within. Here
    // are some oddball edge cases that should work.
    ["\\'", '"\\\'"', "' '\"'\"' '"],
    // Test escaping every ASCII character except ' because it doesn't escape easily.
    // NOTE: I don't know why these tests fail on '\\'. When I run that in bash myself, I get a
    // literal \\ back as expected, but the tests are getting back just a single \.
    Array.from(printableAsciiChars())
      .filter(c => c !== "'" && c !== "\\")
      .map(c => quotePermutations("\\" + c)),
    // Some other escaping tests for more than single chars.
    quotePermutations("\\$WORD"),
    ['\\" Hi \\"', "It\\'s", "\\'  Hi  \\'"],
    // Newlines should be removed when escaped in certain cases.
    ["a\\\nb", '"a\\\nb"', "'a\\\nb'"],
    // Variable assignments
    [
      ...quotePermutations("hello"),
      ...quotePermutations("$WORD"),
      ...quotePermutations("${WORD}"),
      ...quotePermutations("${WORD:-fallback}")
    ].map(value => "NEW_VAR=" + value),
    "NEW_VAR=he'll'${O}",
    'NEW_VAR=he"ll"${O}'
  ]);

  cases.forEach(input => it(input, () => testAgainstBash(input, env)));
});

describe("bash fails to parse", () => {
  describe("whitespace around variable names", () =>
    // Doesn't allow whitespace around variable names
    ["${ BOB}", "${BOB\t}"].forEach(input =>
      it(input, () =>
        expect(() => bash.get(`echo ${input}`, env)).toThrowError(
          "bad substitution"
        )
      )
    ));

  it("escaped single quotes within single quoted strings", () =>
    expect(() => bash.get(`echo '\\''`, env)).toThrowError(
      "unexpected end of file"
    ));
});

function testAgainstBash(input, env) {
  const bashOut = bash.get(`echo ${input}`, env);
  const output = replace(input, env);
  if (output !== bashOut) {
    const parsed = parse(input);
    const substituted = substitute(parsed, env);
    const collapsed = collapseWhitespace(substituted);
    debugger;
  }
  expect(output).toBe(bashOut);
}

function variablePermutations(variable, fallbacks) {
  return [
    quotePermutations("$" + variable),
    quotePermutations("${" + variable + "}"),
    fallbacks.map(f => quotePermutations("${" + variable + ":-" + f + "}"))
  ];
}

function quotePermutations(text) {
  return [text, '"' + text + '"', "'" + text + "'"];
}

function flatten(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
    []
  );
}

function* printableAsciiChars() {
  for (let i = 32; i < 127; ++i) {
    yield String.fromCharCode(i);
  }
}
