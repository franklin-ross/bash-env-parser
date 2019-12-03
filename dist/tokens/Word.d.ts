import { TokenKind } from "./TokenKind";
/** An unquoted word containing no whitespace. */
export declare class Word {
    readonly contents: string;
    readonly kind: TokenKind.Text;
    constructor(contents: string);
    stringify(): string;
    toString(): string;
}
