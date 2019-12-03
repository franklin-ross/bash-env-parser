import { TokenKind } from "./TokenKind";
import { Environment } from "../Environment";
import { Variable } from "./Variable";
import { QuotedString } from "./QuotedString";
import { VerbatimString } from "./VerbatimString";
import { Word } from "./Word";
import { Whitespace } from "./Whitespace";
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
