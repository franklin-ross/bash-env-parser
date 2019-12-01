"use strict";
exports.__esModule = true;
var TokenKind;
(function (TokenKind) {
    TokenKind[TokenKind["List"] = 0] = "List";
    TokenKind[TokenKind["Whitespace"] = 1] = "Whitespace";
    TokenKind[TokenKind["Variable"] = 2] = "Variable";
    TokenKind[TokenKind["Text"] = 3] = "Text";
    TokenKind[TokenKind["QuotedText"] = 4] = "QuotedText";
    TokenKind[TokenKind["LiteralText"] = 5] = "LiteralText";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
var Variable = /** @class */ (function () {
    function Variable(name, fallbackType, fallback) {
        if (fallbackType === void 0) { fallbackType = null; }
        if (fallback === void 0) { fallback = null; }
        this.name = name;
        this.fallbackType = fallbackType;
        this.fallback = fallback;
        this.kind = TokenKind.Variable;
    }
    Variable.prototype.stringify = function (env, collapseWhitespace) {
        if (collapseWhitespace === void 0) { collapseWhitespace = true; }
        var value = env[this.name];
        if (!value) {
            if (this.fallback) {
                return this.fallback.stringify(env, collapseWhitespace);
            }
            else {
                return null;
            }
        }
        return collapseWhitespace ? value.trim().replace(/\s+/g, " ") : value;
    };
    Variable.prototype.toString = function () {
        return ("${" + this.name + (this.fallbackType || "") + (this.fallback || "") + "}");
    };
    return Variable;
}());
exports.Variable = Variable;
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
var QuotedString = /** @class */ (function () {
    function QuotedString(contents) {
        this.contents = contents;
        this.kind = TokenKind.QuotedText;
    }
    QuotedString.prototype.stringify = function (env) {
        return this.contents.reduce(function (text, next) {
            if (typeof next !== "string") {
                next = next.stringify(env, false) || ""; // Surrounding whitespace doesn't ever collapse
            }
            return text + next;
        }, "");
    };
    QuotedString.prototype.toString = function () {
        return "\"" + this.contents + "\"";
    };
    return QuotedString;
}());
exports.QuotedString = QuotedString;
/** Text quoted with single quotes: '. No variable substitution is performed in these strings,
 * whitespace is preserved, and no other characters have special meaning (like double quotes), so
 * the contents are used verbatim. */
var VerbatimString = /** @class */ (function () {
    function VerbatimString(contents) {
        this.contents = contents;
        this.kind = TokenKind.LiteralText;
    }
    VerbatimString.prototype.stringify = function () {
        return this.contents;
    };
    VerbatimString.prototype.toString = function () {
        return "'" + this.contents + "'";
    };
    return VerbatimString;
}());
exports.VerbatimString = VerbatimString;
/** An unquoted word containing no whitespace. */
var Word = /** @class */ (function () {
    function Word(contents) {
        this.contents = contents;
        this.kind = TokenKind.Text;
    }
    Word.prototype.stringify = function () {
        return this.contents;
    };
    Word.prototype.toString = function () {
        return "(" + this.contents + ")";
    };
    return Word;
}());
exports.Word = Word;
/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
var Whitespace = /** @class */ (function () {
    function Whitespace(contents) {
        this.contents = contents;
        this.kind = TokenKind.Whitespace;
    }
    Whitespace.prototype.stringify = function (env, collapseWhitespace) {
        if (collapseWhitespace === void 0) { collapseWhitespace = true; }
        return collapseWhitespace ? " " : this.contents;
    };
    Whitespace.prototype.toString = function () {
        return "(" + this.contents + ")";
    };
    return Whitespace;
}());
exports.Whitespace = Whitespace;
/** A list of tokens, including whitespace. Handles most of the rules for collapsing whitespace
 * based on context. */
var List = /** @class */ (function () {
    function List(items) {
        this.items = items;
        this.kind = TokenKind.List;
    }
    /** Converts the contained items into a string, collapsing any internal whitespace down to single
     * spaces. Whitespace at the start and end is trimmed, unless it's quoted. */
    List.prototype.stringify = function (env, collapseWhitespace) {
        if (collapseWhitespace === void 0) { collapseWhitespace = true; }
        var items = this.items;
        var last = items.length - 1;
        var text = "";
        var i = 0;
        collapseOuterWhitespace();
        for (; i <= last; ++i) {
            var item = items[i];
            var next = item.stringify(env, collapseWhitespace);
            if (next === null) {
                next = "";
                collapseInnerWhitespace();
            }
            text += next;
        }
        return text;
        function collapseOuterWhitespace() {
            if (collapseWhitespace) {
                while (i < last && items[i].kind === TokenKind.Whitespace) {
                    ++i;
                }
                while (i < last && items[last].kind === TokenKind.Whitespace) {
                    --last;
                }
            }
        }
        function collapseInnerWhitespace() {
            if (collapseWhitespace &&
                i > 0 &&
                i < last &&
                items[i - 1].kind === TokenKind.Whitespace &&
                items[i + 1].kind === TokenKind.Whitespace) {
                ++i;
            }
        }
    };
    List.prototype.toString = function () {
        return "[" + this.items + "]";
    };
    return List;
}());
exports.List = List;
