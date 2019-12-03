import { TokenKind } from ".";
import { Environment } from "../Environment";
/** Some whitespace between words, variables, or quoted strings. This is generally either stripped
 * or collapsed. */
export declare class Whitespace {
    readonly contents: string;
    readonly kind: TokenKind.Whitespace;
    constructor(contents: string);
    stringify(env: Environment, collapseWhitespace?: boolean): string;
    toString(): string;
}
