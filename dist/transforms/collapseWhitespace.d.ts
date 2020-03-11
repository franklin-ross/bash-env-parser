import { Whitespace, Token } from "../tokens";
export declare function collapseWhitespace(token: null | Whitespace): null;
export declare function collapseWhitespace(token: Token): Token;
export declare function collapseWhitespace(token: readonly Token[]): readonly Token[];
export declare function collapseWhitespace(token: null | Token | readonly Token[]): null | Token | readonly Token[];
