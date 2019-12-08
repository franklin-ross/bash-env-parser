import { TokenKind, Variable, SubstitutedVariable } from ".";
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export declare class QuotedString {
    readonly contents: ReadonlyArray<string | Variable | SubstitutedVariable>;
    readonly kind: TokenKind.QuotedText;
    constructor(contents: ReadonlyArray<string | Variable | SubstitutedVariable>);
    toString(): string;
}
