export enum TokenKind {
  List,
  Whitespace,
  Variable,
  Text,
  QuotedText,
  LiteralText
}

/** A map of variables which can be replaced by Variable. */
export type Environment = { [envVarName: string]: string };

/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export class Variable {
  readonly kind: TokenKind.Variable = TokenKind.Variable;
  constructor(
    public readonly name: string,
    public readonly fallbackType: null | ":-" | ":=" = null,
    public readonly fallback: null | Token = null
  ) {}

  stringify(env: Environment): string {
    let value = env[this.name];
    if (!value && this.fallback) {
      value = this.fallback.stringify(env);
    }
    return value || "";
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
        next = next.stringify(env);
      }
      return text + next;
    }, "");
  }
}

/** Text quoted with single quotes: '. No variable substitution is performed in these strings,
 * whitespace is preserved, and no other characters have special meaning (like double quotes), so
 * the contents are used verbatim. */
export class VerbatimString {
  readonly kind: TokenKind.LiteralText = TokenKind.LiteralText;
  constructor(public readonly contents: string) {}

  stringify(env: Environment): string {
    return this.contents;
  }
}

/** An unquoted word containing no whitespace. */
export class Word {
  readonly kind: TokenKind.Text = TokenKind.Text;
  constructor(public readonly contents: string) {}

  stringify(env: Environment): string {
    return this.contents;
  }
}

/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
export class Whitespace {
  readonly kind: TokenKind.Whitespace = TokenKind.Whitespace;
  constructor(public readonly contents: string) {}

  stringify(env: Environment): string {
    return this.contents;
  }
}

/** A list of tokens, including whitespace. */
export class List {
  readonly kind: TokenKind.List = TokenKind.List;
  constructor(
    public readonly items: ReadonlyArray<
      Variable | Word | QuotedString | VerbatimString | Whitespace
    >
  ) {}

  /** Converts the contained items into a string, collapsing any internal whitespace down to single
   * spaces. Whitespace at the start and end is trimmed, unless it's quoted. */
  stringify(env: Environment): string {
    const items = this.items;
    const last = items.length - 1;
    let text = "";
    let i = items[0].kind === TokenKind.Whitespace ? 1 : 0;
    for (; i < last; ++i) {
      const item = items[i];
      text += item.kind === TokenKind.Whitespace ? " " : item.stringify(env);
    }
    if (last >= 0) {
      const item = items[i];
      if (item.kind !== TokenKind.Whitespace) {
        text += item.stringify(env);
      }
    }
    return text;
  }
}

export type Token = List | Variable | Word | QuotedString | VerbatimString;
