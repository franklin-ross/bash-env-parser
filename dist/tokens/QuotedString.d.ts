import { TokenKind, Variable, SubstitutedVariable } from ".";
declare type QuotedStringToken = string | Variable | SubstitutedVariable;
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export declare class QuotedString {
    readonly contents: ReadonlyArray<QuotedStringToken>;
    readonly kind: TokenKind.QuotedText;
    constructor(contents: ReadonlyArray<QuotedStringToken>);
    toString(): string;
    /** Transforms this QuotedString, returning a new QuotedString if the result is not structurally identical. */
    transform(transformer: (items: ReadonlyArray<QuotedStringToken>) => ReadonlyArray<QuotedStringToken>): QuotedString;
}
export {};
