import { TokenKind } from "./TokenKind";
import { Environment } from "../Environment";
import { Variable } from "./Variable";
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export declare class QuotedString {
    readonly contents: ReadonlyArray<string | Variable>;
    readonly kind: TokenKind.QuotedText;
    constructor(contents: ReadonlyArray<string | Variable>);
    stringify(env: Environment): string;
    toString(): string;
}
