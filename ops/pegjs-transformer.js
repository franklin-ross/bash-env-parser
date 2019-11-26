/* Exports a transformer object with a process() function which accepts a pegjs grammar and returns
the JS source of the generated parser. Used by jest to compile the grammars on the fly. */

const pegjs = require("pegjs");

module.exports = {
  process: grammarText =>
    pegjs.generate(grammarText, {
      output: "source",
      format: "commonjs"
    })
};
