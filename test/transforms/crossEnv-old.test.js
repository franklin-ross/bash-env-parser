const { crossEnv: commandConvert } = require("../../");

const env = {
  test: "a",
  test1: "b",
  test2: "c",
  test3: "d",
  empty_var: ""
};

describe.skip("cross-env compatibility", () => {
  test(`converts unix-style env variable usage for windows`, () => {
    const isWindows = true;
    expect(commandConvert("$test", env, isWindows)).toBe("%test%");
  });

  test(`leaves command unchanged when not a variable`, () => {
    expect(commandConvert("test", env, false)).toBe("test");
  });

  test(`doesn't convert windows-style env variable`, () => {
    const isWindows = false;
    expect(commandConvert("%test%", env, isWindows)).toBe("%test%");
  });

  test(`leaves variable unchanged when using correct operating system`, () => {
    const isWindows = false;
    expect(commandConvert("$test", env, isWindows)).toBe("$test");
  });

  test(`is stateless`, () => {
    // this test prevents falling into regexp traps like this:
    // http://stackoverflow.com/a/1520853/971592
    const isWindows = true;
    expect(commandConvert("$test", env, isWindows)).toBe(
      commandConvert("$test", env, isWindows)
    );
  });

  test(`converts embedded unix-style env variables usage for windows`, () => {
    const isWindows = true;
    expect(commandConvert("$test1/$test2/$test3", env, isWindows)).toBe(
      "%test1%/%test2%/%test3%"
    );
  });

  // eslint-disable-next-line max-len
  test(`leaves embedded variables unchanged when using correct operating system`, () => {
    const isWindows = false;
    expect(commandConvert("$test1/$test2/$test3", env, isWindows)).toBe(
      "$test1/$test2/$test3"
    );
  });

  test(`converts braced unix-style env variable usage for windows`, () => {
    const isWindows = true;
    // eslint-disable-next-line no-template-curly-in-string
    expect(commandConvert("${test}", env, isWindows)).toBe("%test%");
  });

  test(`removes non-existent variables from the converted command`, () => {
    const isWindows = true;
    expect(commandConvert("$test1/$foo/$test2", env, isWindows)).toBe(
      "%test1%//%test2%"
    );
  });

  test(`removes empty variables from the converted command`, () => {
    const isWindows = true;
    expect(commandConvert("$foo/$test/$empty_var", env, isWindows)).toBe(
      "/%test%/"
    );
  });

  test(`normalizes command on windows`, () => {
    const isWindows = true;
    // index.js calls `commandConvert` with `normalize` param
    // as `true` for command only
    expect(commandConvert("./cmd.bat", env, isWindows)).toBe("cmd.bat");
  });

  describe("output matches cross-env", () => {
    const cases = flatten([]);

    cases.forEach(input => it(input, () => testAgainstCrossEnv(input, env)));
  });
});

function testAgainstCrossEnv(input, env) {
  const crossEnvOut = commandConvert(input, env);
  const output = replace(input, env);
  expect(output).toBe(crossEnvOut);
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
