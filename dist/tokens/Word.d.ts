import { TokenKind } from ".";
/** An unquoted word containing no whitespace. */
export declare class Word {
    readonly contents: string;
    readonly kind: TokenKind.Text;
    constructor(contents: string);
    toString(): string;
}
