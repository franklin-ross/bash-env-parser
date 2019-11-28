export enum TokenKind {
  EnvironmentVariable,
  String,
  QuotedString
}

export type Environment = { [envVarName: string]: string };

export class VariableToken {
  readonly kind: TokenKind.EnvironmentVariable = TokenKind.EnvironmentVariable;
  constructor(
    public readonly name: string,
    public readonly fallbackType: null | ":-" | ":=" = null,
    public readonly fallback: null | StringToken | QuotedStringToken = null
  ) {}

  stringify(env: Environment): string {
    let value = env[this.name];
    if (!value && this.fallback) {
      value = this.fallback.stringify(env);
    }
    return value || "";
  }
}

export class QuotedStringToken {
  readonly kind: TokenKind.QuotedString = TokenKind.QuotedString;
  constructor(
    public readonly contents: Array<string | VariableToken>,
    public readonly quote: '"' | "'"
  ) {}

  stringify(env: Environment): string {
    return this.contents.reduce<string>((text, next) => {
      if (typeof next !== "string") {
        next = next.stringify(env);
      }
      return text + next;
    }, "");
  }
}

export class StringToken {
  readonly kind: TokenKind.String = TokenKind.String;
  constructor(
    public readonly contents: Array<string | VariableToken | QuotedStringToken>
  ) {}

  stringify(env: Environment): string {
    return this.contents.reduce<string>((text, next) => {
      if (typeof next !== "string") {
        next = next.stringify(env);
      }
      return text + next.trim();
    }, "");
  }
}

export type Token = VariableToken | StringToken | QuotedStringToken;
