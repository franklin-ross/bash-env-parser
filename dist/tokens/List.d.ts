import { TokenKind, Variable, QuotedString, VerbatimString, Word, Whitespace, SubstitutedVariable } from ".";
/** The types of token allowed in a List. */
export declare type ListItem = Variable | SubstitutedVariable | Word | QuotedString | VerbatimString | Whitespace;
/** A list of tokens, including whitespace. Handles most of the rules for collapsing whitespace
 * based on context. */
export declare class List {
    readonly items: ReadonlyArray<ListItem>;
    readonly kind: TokenKind.List;
    constructor(items: ReadonlyArray<ListItem>);
    toString(): string;
}
