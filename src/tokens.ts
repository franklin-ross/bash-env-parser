export const enum TokenKind {
  List,
  Whitespace,
  Variable,
  Text,
  QuotedText,
  LiteralText
}

/** A map of variables which can be substituted. */
export type Environment = { [envVarName: string]: string | null | undefined };

/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export class Variable {
  readonly kind: TokenKind.Variable = TokenKind.Variable;
  constructor(
    public readonly name: string,
    public readonly fallbackType: null | ":-" | ":=" = null,
    public readonly fallback: null | Token = null
  ) {}

  stringify(
    env: Environment,
    collapseWhitespace: boolean = true
  ): null | string {
    const value = env[this.name];
    if (!value) {
      if (this.fallback) {
        return this.fallback.stringify(env, collapseWhitespace);
      } else {
        return null;
      }
    }
    return collapseWhitespace ? value.trim().replace(/\s+/g, " ") : value;
  }

  toString() {
    return (
      "${" + this.name + (this.fallbackType || "") + (this.fallback || "") + "}"
    );
  }
}

/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export class QuotedString {
  readonly kind: TokenKind.QuotedText = TokenKind.QuotedText;
  constructor(public readonly contents: ReadonlyArray<string | Variable>) {}

  stringify(env: Environment): string {
    return this.contents.reduce<string>((text, next) => {
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

/** Text quoted with single quotes: '. No variable substitution is performed in these strings,
 * whitespace is preserved, and no other characters have special meaning (like double quotes), so
 * the contents are used verbatim. */
export class VerbatimString {
  readonly kind: TokenKind.LiteralText = TokenKind.LiteralText;
  constructor(public readonly contents: string) {}

  stringify(): string {
    return this.contents;
  }

  toString() {
    return `'${this.contents}'`;
  }
}

/** An unquoted word containing no whitespace. */
export class Word {
  readonly kind: TokenKind.Text = TokenKind.Text;
  constructor(public readonly contents: string) {}

  stringify(): string {
    return this.contents;
  }

  toString() {
    return `(${this.contents})`;
  }
}

/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
export class Whitespace {
  readonly kind: TokenKind.Whitespace = TokenKind.Whitespace;
  constructor(public readonly contents: string) {}

  stringify(env: Environment, collapseWhitespace: boolean = true): string {
    return collapseWhitespace ? " " : this.contents;
  }

  toString() {
    return `(${this.contents})`;
  }
}

/** A list of tokens, including whitespace. Handles most of the rules for collapsing whitespace
 * based on context. */
export class List {
  readonly kind: TokenKind.List = TokenKind.List;
  constructor(
    public readonly items: ReadonlyArray<
      Variable | Word | QuotedString | VerbatimString | Whitespace
    >
  ) {}

  /** Converts the contained items into a string, with support for collapsing whitespace around
   * "words". */
  stringify(env: Environment, collapseWhitespace: boolean = true): string {
    if (collapseWhitespace) {
      let lastWasWs = false;
      return this.items.reduce((text: string, token) => {
        if (token.kind === TokenKind.Whitespace) {
          lastWasWs = true;
          return text;
        }

        const next = token.stringify(env, true);
        if (next === null) return text;

        if (lastWasWs && text !== "") {
          text += " ";
        }
        lastWasWs = false;
        return text + next;
      }, "");
    }

    return this.items
      .map(token => token.stringify(env, false))
      .filter(<T>(token: T): token is Exclude<T, null> => token !== null)
      .join("");
  }

  toString() {
    return `[${this.items}]`;
  }
}

export type Token = List | Variable | Word | QuotedString | VerbatimString;
