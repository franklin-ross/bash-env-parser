'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const TransformChildren = Symbol("transform children");
//# sourceMappingURL=Symbols.js.map

function transformChildren(value, transformer) {
    var _a;
    if (Array.isArray(value)) {
        return transformArray(value, transformer);
    }
    else if (typeof ((_a = value) === null || _a === void 0 ? void 0 : _a[TransformChildren]) === "function") {
        return value[TransformChildren](transformer);
    }
    return value;
}
/** Transforms an array, returning a new array only if any elements change. Nullish transform
 * results are removed, and array transform results are flattened (by one level only.) */
function transformArray(value, transformer) {
    // Scan through the children until the transform function changes one of them.
    for (let i = 0, len = value.length; i < len; ++i) {
        let item = value[i];
        let transformed = transformer(item);
        if (item === transformed)
            continue;
        // Once a child has changed: create a new list, apply the changes, and return it.
        const newList = value.slice(0, i);
        push(newList, transformed);
        for (++i; i < len; ++i) {
            item = value[i];
            transformed = transformer(item);
            push(newList, transformed);
        }
        return newList;
    }
    // When there are no changes, return this object.
    return value;
}
/** Push an item, or flatten an array of items into the list argument, removing nullish values. */
function push(list, items) {
    if (items != null) {
        if (Array.isArray(items)) {
            for (const item of items) {
                if (item != null) {
                    list.push(item);
                }
            }
        }
        else {
            list.push(items);
        }
    }
}
//# sourceMappingURL=transformChildren.js.map

/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
class Variable {
    constructor(name, fallbackType = null, fallback = null) {
        this.name = name;
        this.fallbackType = fallbackType;
        this.fallback = fallback;
    }
    /** Stringifies the variable into it's bash version, including fallback. */
    toString() {
        var _a, _b;
        return ("${" + this.name + (_a = this.fallbackType, (_a !== null && _a !== void 0 ? _a : "")) + (_b = this.fallback, (_b !== null && _b !== void 0 ? _b : "")) + "}");
    }
    [TransformChildren](transformer) {
        const contents = this.fallback;
        if (contents == null)
            return contents;
        const transformed = transformChildren(contents, transformer);
        return transformed !== contents
            ? new Variable(this.name, this.fallbackType, transformed)
            : this;
    }
}
//# sourceMappingURL=Variable.js.map

/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
class VariableAssignment {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toString() {
        return this.name + "=" + this.value;
    }
    /** Clones this with a new value, unless the value is unchanged. */
    withValue(newValue) {
        return this.value === newValue
            ? this
            : new VariableAssignment(this.name, newValue);
    }
    [TransformChildren](transformer) {
        const contents = this.value;
        const transformed = transformChildren(contents, transformer);
        return transformed !== contents
            ? new VariableAssignment(this.name, transformed)
            : this;
    }
}
//# sourceMappingURL=VariableAssignment.js.map

/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
class QuotedString {
    constructor(contents) {
        this.contents = contents;
    }
    toString() {
        return `"${this.contents}"`;
    }
    [TransformChildren](transformer) {
        const contents = this.contents;
        const transformed = transformChildren(contents, transformer);
        return transformed !== contents ? new QuotedString(transformed) : this;
    }
}
//# sourceMappingURL=QuotedString.js.map

/** Text quoted with single quotes: '. No variable substitution is performed in these strings,
 * whitespace is preserved, and no other characters have special meaning (like double quotes), so
 * the contents are used verbatim. */
class VerbatimString {
    constructor(contents) {
        this.contents = contents;
    }
    toString() {
        return `'${this.contents}'`;
    }
}
//# sourceMappingURL=VerbatimString.js.map

/** An unquoted word containing no whitespace. */
class Word {
    constructor(contents) {
        this.contents = contents;
    }
    toString() {
        return `${this.contents}`;
    }
}
//# sourceMappingURL=Word.js.map

/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
class Whitespace {
    constructor(contents) {
        this.contents = contents;
    }
    toString() {
        return `${this.contents}`;
    }
}
//# sourceMappingURL=Whitespace.js.map

//# sourceMappingURL=index.js.map

var tokens = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Variable: Variable,
  VariableAssignment: VariableAssignment,
  QuotedString: QuotedString,
  VerbatimString: VerbatimString,
  Word: Word,
  Whitespace: Whitespace,
  TransformChildren: TransformChildren,
  transformChildren: transformChildren
});

var parser = /*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

"use strict";

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { start: peg$parsestart, VariableValue: peg$parseVariableValue },
      peg$startRuleFunction  = peg$parsestart,

      peg$c0 = function(value) { return singleOrList(value) },
      peg$c1 = "=",
      peg$c2 = peg$literalExpectation("=", false),
      peg$c3 = function(name, value) {
          return new VariableAssignment(name, singleOrList(value));
        },
      peg$c4 = "${",
      peg$c5 = peg$literalExpectation("${", false),
      peg$c6 = ":-",
      peg$c7 = peg$literalExpectation(":-", false),
      peg$c8 = ":=",
      peg$c9 = peg$literalExpectation(":=", false),
      peg$c10 = "}",
      peg$c11 = peg$literalExpectation("}", false),
      peg$c12 = function(name, fallbackType, fallback) {
          return new Variable(name, fallbackType, fallback);
        },
      peg$c13 = function(name) { return new Variable(name); },
      peg$c14 = "$",
      peg$c15 = peg$literalExpectation("$", false),
      peg$c16 = function() { return new VerbatimString("$"); },
      peg$c17 = function(tokens) {
          return singleOrList(tokens);
        },
      peg$c18 = peg$otherExpectation("variable name"),
      peg$c19 = /^[a-zA-Z_]/,
      peg$c20 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false),
      peg$c21 = /^[a-zA-Z_0-9]/,
      peg$c22 = peg$classExpectation([["a", "z"], ["A", "Z"], "_", ["0", "9"]], false, false),
      peg$c23 = function() { return text(); },
      peg$c24 = /^[ \t\n\r]/,
      peg$c25 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),
      peg$c26 = function() { return new Whitespace(text()); },
      peg$c27 = /^[^ \t\n\r]/,
      peg$c28 = peg$classExpectation([" ", "\t", "\n", "\r"], true, false),
      peg$c29 = function() { return new Word(text()); },
      peg$c30 = "'",
      peg$c31 = peg$literalExpectation("'", false),
      peg$c32 = function(chars) {
          return new VerbatimString(chars);
        },
      peg$c33 = "\"",
      peg$c34 = peg$literalExpectation("\"", false),
      peg$c35 = function(tokens) {
          return new QuotedString(tokens);
        },
      peg$c36 = function(chars) { return new Word(chars.join("")); },
      peg$c37 = function(chars) { return chars.join(""); },
      peg$c38 = "\\",
      peg$c39 = peg$literalExpectation("\\", false),
      peg$c40 = /^[$"`\\]/,
      peg$c41 = peg$classExpectation(["$", "\"", "`", "\\"], false, false),
      peg$c42 = function(escaped) { return escaped; },
      peg$c43 = "\\\n",
      peg$c44 = peg$literalExpectation("\\\n", false),
      peg$c45 = function() { return ""; },
      peg$c46 = /^[$"]/,
      peg$c47 = peg$classExpectation(["$", "\""], false, false),
      peg$c48 = peg$anyExpectation(),
      peg$c49 = function(char) { return char; },
      peg$c50 = /^[$}'"]/,
      peg$c51 = peg$classExpectation(["$", "}", "'", "\""], false, false),
      peg$c52 = /^[$'"]/,
      peg$c53 = peg$classExpectation(["$", "'", "\""], false, false),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsestart() {
    var s0, s1;

    s0 = [];
    s1 = peg$parseVariableAssignment();
    if (s1 === peg$FAILED) {
      s1 = peg$parseWordToken();
      if (s1 === peg$FAILED) {
        s1 = peg$parseWhitespace();
      }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parseVariableAssignment();
      if (s1 === peg$FAILED) {
        s1 = peg$parseWordToken();
        if (s1 === peg$FAILED) {
          s1 = peg$parseWhitespace();
        }
      }
    }

    return s0;
  }

  function peg$parseVariableValue() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseNotWhitespace();
    if (s2 === peg$FAILED) {
      s2 = peg$parseWhitespace();
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseNotWhitespace();
      if (s2 === peg$FAILED) {
        s2 = peg$parseWhitespace();
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c0(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseWordToken() {
    var s0;

    s0 = peg$parseVerbatimString();
    if (s0 === peg$FAILED) {
      s0 = peg$parseQuotedString();
      if (s0 === peg$FAILED) {
        s0 = peg$parseWord();
        if (s0 === peg$FAILED) {
          s0 = peg$parseVariable();
        }
      }
    }

    return s0;
  }

  function peg$parseVariableAssignment() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseVarName();
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c1;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseWordToken();
        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseWordToken();
          }
        } else {
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c3(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseVariable() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c4) {
      s1 = peg$c4;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c5); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseVarName();
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c6) {
          s3 = peg$c6;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c7); }
        }
        if (s3 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c8) {
            s3 = peg$c8;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c9); }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseFallback();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c10;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c11); }
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c12(s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c4) {
        s1 = peg$c4;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c5); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseVarName();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 125) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c13(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 36) {
          s1 = peg$c14;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseVarName();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c13(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 36) {
            s1 = peg$c14;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c15); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c16();
          }
          s0 = s1;
        }
      }
    }

    return s0;
  }

  function peg$parseFallback() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseVerbatimString();
    if (s2 === peg$FAILED) {
      s2 = peg$parseQuotedString();
      if (s2 === peg$FAILED) {
        s2 = peg$parseWordInBrace();
        if (s2 === peg$FAILED) {
          s2 = peg$parseVariable();
          if (s2 === peg$FAILED) {
            s2 = peg$parseWhitespace();
          }
        }
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseVerbatimString();
      if (s2 === peg$FAILED) {
        s2 = peg$parseQuotedString();
        if (s2 === peg$FAILED) {
          s2 = peg$parseWordInBrace();
          if (s2 === peg$FAILED) {
            s2 = peg$parseVariable();
            if (s2 === peg$FAILED) {
              s2 = peg$parseWhitespace();
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c17(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseVarName() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    if (peg$c19.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c20); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c21.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c22); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c21.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c22); }
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c23();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c18); }
    }

    return s0;
  }

  function peg$parseWhitespace() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c24.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c25); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c24.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c25); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c26();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseNotWhitespace() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c27.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c28); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c27.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c28); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c29();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseVerbatimString() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 39) {
      s1 = peg$c30;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c31); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseVerbatimChars();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 39) {
          s3 = peg$c30;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c31); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c32(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseQuotedString() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 34) {
      s1 = peg$c33;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c34); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseQuotedChars();
      if (s3 === peg$FAILED) {
        s3 = peg$parseVariable();
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseQuotedChars();
        if (s3 === peg$FAILED) {
          s3 = peg$parseVariable();
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s3 = peg$c33;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c35(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseWord() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseBareStringChar();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseBareStringChar();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c36(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseWordInBrace() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseBraceStringChar();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseBraceStringChar();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c36(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseVerbatimChars() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseSingleStringChar();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseSingleStringChar();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c37(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseQuotedChars() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseDoubleStringChar();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseDoubleStringChar();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c37(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseDoubleStringChar() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 92) {
      s1 = peg$c38;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c39); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c40.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c43) {
        s1 = peg$c43;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c45();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (peg$c46.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c48); }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c49(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
    }

    return s0;
  }

  function peg$parseSingleStringChar() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;
    if (input.charCodeAt(peg$currPos) === 39) {
      s2 = peg$c30;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c31); }
    }
    peg$silentFails--;
    if (s2 === peg$FAILED) {
      s1 = void 0;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c48); }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c49(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseBraceStringChar() {
    var s0, s1, s2;

    s0 = peg$parseEscaped();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (peg$c50.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }
      if (s2 === peg$FAILED) {
        s2 = peg$parseWhitespace();
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c48); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c49(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseBareStringChar() {
    var s0, s1, s2;

    s0 = peg$parseEscaped();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (peg$c52.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c53); }
      }
      if (s2 === peg$FAILED) {
        s2 = peg$parseWhitespace();
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c48); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c49(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseEscaped() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c43) {
      s1 = peg$c43;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c44); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c45();
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c38;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c39); }
      }
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c48); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }


    const {
      QuotedString,
      VerbatimString,
      Variable,
      VariableAssignment,
      Word,
      Whitespace
    } = tokens;

    function singleOrList(list) {
      return list.length === 1 ? list[0] : list;
    }


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

var parser = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};
var parser_1 = parser.parse;

/** Collapses adjacent whitespace down to a single space. Only collapses a single level, without
 * recursing into children.
 * @param token The token or array of tokens to process. */
function collapseWhitespace(token) {
    if (token == null)
        return null;
    if (!Array.isArray(token)) {
        return token instanceof Whitespace ? null : token;
    }
    let lastWasWs = false;
    let hasOutput = false;
    return transformChildren(token, child => {
        if (child instanceof Whitespace) {
            lastWasWs = true;
            return null;
        }
        const prefixWs = lastWasWs && hasOutput;
        lastWasWs = false;
        hasOutput = true;
        return prefixWs ? [new Whitespace(" "), child] : child;
    });
}
//# sourceMappingURL=collapseWhitespace.js.map

/** Converts a token to a string. Whitespace is concatenated verbatim and quoted strings are
 * expanded to their content, without the quotes. Variables which haven't been substituted are
 * stripped. */
function stringify(token) {
    var _a;
    return _a = str(token), (_a !== null && _a !== void 0 ? _a : "");
}
function str(token) {
    var _a, _b;
    if (typeof token === "string")
        return token;
    if (Array.isArray(token)) {
        return transformChildren(token, str).join("");
    }
    if (token instanceof VariableAssignment) {
        return `${token.name}=${_a = str(token.value), (_a !== null && _a !== void 0 ? _a : "")}`;
    }
    if (token instanceof QuotedString) {
        const contents = (_b = token.contents, (_b !== null && _b !== void 0 ? _b : ""));
        if (typeof contents === "string")
            return contents;
        let result = "";
        transformChildren(contents, item => {
            var _a;
            result += (_a = str(item), (_a !== null && _a !== void 0 ? _a : ""));
            return item;
        });
        return result;
    }
    if (token instanceof Word ||
        token instanceof VerbatimString ||
        token instanceof Whitespace) {
        return token.contents;
    }
}
//# sourceMappingURL=stringify.js.map

const parseOptions = { startRule: "VariableValue" };
const parseEnvValue = (value) => parser_1(value, parseOptions);
/** Returns a new syntax tree with all variable references substituted/expanded.
 * @param token The root token to transform.
 * @param env The environment to use for looking up/assigning variables.
 * @param inlineAssignment Whether to set variable assignment tokens into the environment object as
 * they are processed, allowing them to be referenced by later substitutions. Defaults to false. Set
 * to true to enable `cross-env` style variable assignment. If true, the tokens are removed from the
 * resulting tree once assigned. */
function substitute(token, env, inlineAssignment = false) {
    return transformChildren(token, sub);
    function sub(token) {
        if (token instanceof Variable) {
            const value = env[token.name];
            if (value == null || value === "") {
                return token.fallback ? sub(token.fallback) : null;
            }
            return parseEnvValue(value);
        }
        if (token instanceof VariableAssignment) {
            const substitutedValue = sub(token.value);
            if (substitutedValue == null)
                return null;
            if (inlineAssignment) {
                const collapsedValue = collapseWhitespace(substitutedValue);
                if (collapsedValue == null)
                    return null;
                const stringValue = stringify(collapsedValue);
                env[token.name] = stringValue;
                return null;
            }
            return token.withValue(substitutedValue);
        }
        return transformChildren(token, sub);
    }
}

function toShellArgs(token) {
    if (Array.isArray(token)) {
        const args = [];
        let lastWasWs = false;
        for (const child of token) {
            if (child instanceof Whitespace) {
                lastWasWs = true;
            }
            else {
                const next = toShellArgs(child);
                if (next !== null) {
                    if (lastWasWs || args.length === 0) {
                        args.push(next);
                    }
                    else {
                        args[args.length - 1] += next;
                    }
                    lastWasWs = false;
                }
            }
        }
        return args;
    }
    if (token instanceof Variable || token instanceof VariableAssignment) {
        return null;
    }
    if (token instanceof QuotedString) {
        return stringify(token);
    }
    if (token instanceof Word ||
        token instanceof VerbatimString ||
        token instanceof Whitespace) {
        return token.contents;
    }
}
//# sourceMappingURL=toShellArgs.js.map

/** Assigns any variable assignment tokens into the environment. If their value has not yet been
 * substituted then the environment at that step is used. Note that the usual order for bash is to
 * first substitute all tokens up front, then assign variables. If that ordering is preferred then
 * call @see substitute() on the tree first. */
function extractEnvironment(token, env = {}) {
    if (token != null) {
        extract(token);
    }
    return env;
    function extract(t) {
        if (t instanceof VariableAssignment) {
            const substitutedValue = substitute(t.value, env, false);
            const collapsedValue = collapseWhitespace(substitutedValue);
            const stringValue = stringify(collapsedValue);
            if (stringValue !== "") {
                env[t.name] = stringValue;
            }
        }
        else {
            transformChildren(t, extract);
        }
        return t;
    }
}

/** Parses the input expression for bash style variables, returning a parse tree. Supports bash
 * style quotes (double and single), and default values.
 * @param expression The input text to parse. Eg: "${NODE_ENV:-${ENV:-prod}}", "My name is $NAME",
 * "And '  quoted' spaces".
 * @returns The parse tree representing the input. */
const parse = (expression) => parser_1(expression);
/** Replaces environment variables in the input.
 * @param expression The input text. Eg: "${NODE_ENV:-${ENV:-prod}}", "My name is $NAME",
 * "And '  quoted' spaces".
 * @param environment An object containing the environment variables and their values to replace in
 * the expression.
 * @returns A string with all environment variables either replaced, or removed if no value could be
 * substituted. Adjacent whitespace is collapsed down to a single space unless quoted. */
const replace = (expression, environment) => {
    const parsed = parser_1(expression);
    const substituted = substitute(parsed, environment);
    const collapsed = collapseWhitespace(substituted);
    return stringify(collapsed);
};
//# sourceMappingURL=index.js.map

exports.QuotedString = QuotedString;
exports.TransformChildren = TransformChildren;
exports.Variable = Variable;
exports.VariableAssignment = VariableAssignment;
exports.VerbatimString = VerbatimString;
exports.Whitespace = Whitespace;
exports.Word = Word;
exports.collapseWhitespace = collapseWhitespace;
exports.extractEnvironment = extractEnvironment;
exports.parse = parse;
exports.replace = replace;
exports.stringify = stringify;
exports.substitute = substitute;
exports.toShellArgs = toShellArgs;
exports.transformChildren = transformChildren;
//# sourceMappingURL=index.js.map
