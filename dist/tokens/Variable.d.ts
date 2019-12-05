import { Environment } from "../Environment";
import { Token, TokenKind } from ".";
/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export declare class Variable {
    readonly name: string;
    readonly fallbackType: null | ":-" | ":=";
    readonly fallback: null | Token;
    readonly kind: TokenKind.Variable;
    constructor(name: string, fallbackType?: null | ":-" | ":=", fallback?: null | Token);
    stringify(env: Environment, collapseWhitespace?: boolean): null | string;
    toString(): string;
}