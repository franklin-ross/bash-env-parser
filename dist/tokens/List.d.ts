import { TokenKind, Token } from ".";
/** A list of tokens. */
export declare class List {
    readonly items: ReadonlyArray<Token>;
    readonly kind: TokenKind.List;
    constructor(items: ReadonlyArray<Token>);
    toString(): string;
    /** Transforms this list, returning a new list if the result is not structurally identical. */
    transform(transformer: (items: ReadonlyArray<Token>) => ReadonlyArray<Token>): List;
}
