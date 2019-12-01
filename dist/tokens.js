"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class Variable {
    constructor(name, fallbackType = null, fallback = null) {
        this.name = name;
        this.fallbackType = fallbackType;
        this.fallback = fallback;
        this.kind = TokenKind.Variable;
    }
    stringify(env, collapseWhitespace = true) {
        const value = env[this.name];
        if (!value) {
            if (this.fallback) {
                return this.fallback.stringify(env, collapseWhitespace);
            }
            else {
                return null;
            }
        }
        return collapseWhitespace ? value.trim().replace(/\s+/g, " ") : value;
    }
    toString() {
        return ("${" + this.name + (this.fallbackType || "") + (this.fallback || "") + "}");
    }
}
exports.Variable = Variable;
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
class QuotedString {
    constructor(contents) {
        this.contents = contents;
        this.kind = TokenKind.QuotedText;
    }
    stringify(env) {
        return this.contents.reduce((text, next) => {
            if (typeof next !== "string") {
                next = next.stringify(env, false) || ""; // Surrounding whitespace doesn't ever collapse
            }
            return text + next;
        }, "");
    }
    toString() {
        return `"${this.contents}"`;
    }
}
exports.QuotedString = QuotedString;
/** Text quoted with single quotes: '. No variable substitution is performed in these strings,
 * whitespace is preserved, and no other characters have special meaning (like double quotes), so
 * the contents are used verbatim. */
class VerbatimString {
    constructor(contents) {
        this.contents = contents;
        this.kind = TokenKind.LiteralText;
    }
    stringify() {
        return this.contents;
    }
    toString() {
        return `'${this.contents}'`;
    }
}
exports.VerbatimString = VerbatimString;
/** An unquoted word containing no whitespace. */
class Word {
    constructor(contents) {
        this.contents = contents;
        this.kind = TokenKind.Text;
    }
    stringify() {
        return this.contents;
    }
    toString() {
        return `(${this.contents})`;
    }
}
exports.Word = Word;
/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
class Whitespace {
    constructor(contents) {
        this.contents = contents;
        this.kind = TokenKind.Whitespace;
    }
    stringify(env, collapseWhitespace = true) {
        return collapseWhitespace ? " " : this.contents;
    }
    toString() {
        return `(${this.contents})`;
    }
}
exports.Whitespace = Whitespace;
/** A list of tokens, including whitespace. Handles most of the rules for collapsing whitespace
 * based on context. */
class List {
    constructor(items) {
        this.items = items;
        this.kind = TokenKind.List;
    }
    /** Converts the contained items into a string, collapsing any internal whitespace down to single
     * spaces. Whitespace at the start and end is trimmed, unless it's quoted. */
    stringify(env, collapseWhitespace = true) {
        const items = this.items;
        let last = items.length - 1;
        let text = "";
        let i = 0;
        collapseOuterWhitespace();
        for (; i <= last; ++i) {
            const item = items[i];
            let next = item.stringify(env, collapseWhitespace);
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
    }
    toString() {
        return `[${this.items}]`;
    }
}
exports.List = List;
