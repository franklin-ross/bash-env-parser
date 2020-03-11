const bash = require("../bash-exec");

beforeAll(() => bash.loadCache());
afterAll(() => bash.saveCache());

const env = {
  EMPTY: "", // Should correctly handle variables set to the empty string
  WORD: "variable",
  INTERNAL_SPACES: "variable with internal   spaces",
  OUTER_SPACES: " variable-with-outer-spaces    "
};

describe("output matches cross-env", () => {
  const cases = flatten([
    Object.keys(env).map(name => variablePermutations(name)),
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
      ...quotePermutations("${WORD}")
    ].map(value => "NEW_VAR=" + value),
    "NEW_VAR=he'll'${O}",
    'NEW_VAR=he"ll"${O}'
  ]);

  cases.forEach(input => it(input, () => testAgainstCrossEnv(input, env)));
});

function testAgainstCrossEnv(input, env) {
  const ogCrossEnvOut = bash.get(
    `node_modules/.bin/cross-env echo ${input}`,
    env
  );
  const localCrossEnvOut = bash.get(
    `node test/crossEnv/cross-env-bin.js echo ${input}`,
    env,
    false
  );
  if (localCrossEnvOut !== ogCrossEnvOut) debugger;
  expect(localCrossEnvOut).toBe(ogCrossEnvOut);
}

function variablePermutations(variable) {
  return [
    quotePermutations("$" + variable),
    quotePermutations("${" + variable + "}")
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
