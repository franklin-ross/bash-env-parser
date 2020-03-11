import { TransformChildren, ITokenTransform } from "./infrastructure";
import { Token } from ".";
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export declare class QuotedString {
    readonly contents: Token | ReadonlyArray<Token>;
    constructor(contents: Token | ReadonlyArray<Token>);
    toString(): string;
    [TransformChildren](transformer: ITokenTransform): QuotedString;
}
