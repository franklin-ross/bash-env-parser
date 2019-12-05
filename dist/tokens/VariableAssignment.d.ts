import { TokenKind, List } from ".";
import { Environment } from "..";
/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export declare class VariableAssignment {
    readonly name: string;
    readonly value: List;
    readonly kind: TokenKind.VariableAssignment;
    constructor(name: string, value: List);
    stringify(env: Environment, collapseWhitespace?: boolean): string;
    toString(): string;
}
