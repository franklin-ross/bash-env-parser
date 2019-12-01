"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
class Variable {
    constructor(name, fallbackType = null, fallback = null) {
        this.name = name;
        this.fallbackType = fallbackType;
        this.fallback = fallback;
        this.kind = 2 /* Variable */;
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
        this.kind = 4 /* QuotedText */;
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
        this.kind = 5 /* LiteralText */;
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
        this.kind = 3 /* Text */;
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
        this.kind = 1 /* Whitespace */;
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
        this.kind = 0 /* List */;
    }
    /** Converts the contained items into a string, with support for collapsing whitespace around
     * "words". */
    stringify(env, collapseWhitespace = true) {
        if (collapseWhitespace) {
            let lastWasWs = false;
            return this.items.reduce((text, token) => {
                if (token.kind === 1 /* Whitespace */) {
                    lastWasWs = true;
                    return text;
                }
                const next = token.stringify(env, true);
                if (next === null)
                    return text;
                if (lastWasWs && text !== "") {
                    text += " ";
                }
                lastWasWs = false;
                return text + token;
            }, "");
        }
        return this.items
            .map(token => token.stringify(env, false))
            .filter((token) => token !== null)
            .join("");
    }
    toString() {
        return `[${this.items}]`;
    }
}
exports.List = List;
