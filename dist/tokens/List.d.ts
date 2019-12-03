import { Environment } from "../Environment";
import { TokenKind, Variable, QuotedString, VerbatimString, Word, Whitespace } from ".";
/** A list of tokens, including whitespace. Handles most of the rules for collapsing whitespace
 * based on context. */
export declare class List {
    readonly items: ReadonlyArray<Variable | Word | QuotedString | VerbatimString | Whitespace>;
    readonly kind: TokenKind.List;
    constructor(items: ReadonlyArray<Variable | Word | QuotedString | VerbatimString | Whitespace>);
    /** Converts the contained items into a string, with support for collapsing whitespace around
     * "words". */
    stringify(env: Environment, collapseWhitespace?: boolean): string;
    toString(): string;
}
