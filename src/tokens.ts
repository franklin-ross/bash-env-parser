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

  /** Converts the contained items into a string, collapsing any internal whitespace down to single
   * spaces. Whitespace at the start and end is trimmed, unless it's quoted. */
  stringify(env: Environment, collapseWhitespace: boolean = true): string {
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
      if (
        collapseWhitespace &&
        i > 0 &&
        i < last &&
        items[i - 1].kind === TokenKind.Whitespace &&
        items[i + 1].kind === TokenKind.Whitespace
      ) {
        ++i;
      }
    }
  }

  toString() {
    return `[${this.items}]`;
  }
}

export type Token = List | Variable | Word | QuotedString | VerbatimString;
