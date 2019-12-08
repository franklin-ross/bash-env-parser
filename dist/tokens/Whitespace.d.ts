import { TokenKind } from ".";
/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
export declare class Whitespace {
    readonly contents: string;
    readonly kind: TokenKind.Whitespace;
    constructor(contents: string);
    toString(): string;
}
