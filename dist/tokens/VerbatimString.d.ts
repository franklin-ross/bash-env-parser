import { TokenKind } from "./TokenKind";
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
