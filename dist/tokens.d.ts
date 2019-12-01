export declare const enum TokenKind {
    List = 0,
    Whitespace = 1,
    Variable = 2,
    Text = 3,
    QuotedText = 4,
    LiteralText = 5
}
/** A map of variables which can be substituted. */
export declare type Environment = {
    [envVarName: string]: string | null | undefined;
};
/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export declare class Variable {
    readonly name: string;
    readonly fallbackType: null | ":-" | ":=";
    readonly fallback: null | Token;
    readonly kind: TokenKind.Variable;
    constructor(name: string, fallbackType?: null | ":-" | ":=", fallback?: null | Token);
    stringify(env: Environment, collapseWhitespace?: boolean): null | string;
    toString(): string;
}
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export declare class QuotedString {
    readonly contents: ReadonlyArray<string | Variable>;
    readonly kind: TokenKind.QuotedText;
    constructor(contents: ReadonlyArray<string | Variable>);
    stringify(env: Environment): string;
    toString(): string;
}
/** Text quoted with single quotes: '. No variable substitution is performed in these strings,
 * whitespace is preserved, and no other characters have special meaning (like double quotes), so
 * the contents are used verbatim. */
export declare class VerbatimString {
    readonly contents: string;
    readonly kind: TokenKind.LiteralText;
    constructor(contents: string);
    stringify(): string;
    toString(): string;
}
/** An unquoted word containing no whitespace. */
export declare class Word {
    readonly contents: string;
    readonly kind: TokenKind.Text;
    constructor(contents: string);
    stringify(): string;
    toString(): string;
}
/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
export declare class Whitespace {
    readonly contents: string;
    readonly kind: TokenKind.Whitespace;
    constructor(contents: string);
    stringify(env: Environment, collapseWhitespace?: boolean): string;
    toString(): string;
}
/** A list of tokens, including whitespace. Handles most of the rules for collapsing whitespace
 * based on context. */
export declare class List {
    readonly items: ReadonlyArray<Variable | Word | QuotedString | VerbatimString | Whitespace>;
    readonly kind: TokenKind.List;
    constructor(items: ReadonlyArray<Variable | Word | QuotedString | VerbatimString | Whitespace>);
    /** Converts the contained items into a string, collapsing any internal whitespace down to single
     * spaces. Whitespace at the start and end is trimmed, unless it's quoted. */
    stringify(env: Environment, collapseWhitespace?: boolean): string;
    toString(): string;
}
export declare type Token = List | Variable | Word | QuotedString | VerbatimString;
