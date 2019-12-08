import { TokenKind, Token } from ".";
/** A list of tokens. */
export declare class List {
    readonly items: ReadonlyArray<Token>;
    readonly kind: TokenKind.List;
    constructor(items: ReadonlyArray<Token>);
    toString(): string;
}
