import { TokenKind, VerbatimString, QuotedString, Word, Variable } from ".";
import { Environment } from "..";
/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export declare class VariableAssignment {
    readonly name: string;
    readonly value: VerbatimString | QuotedString | Word | Variable;
    readonly kind: TokenKind.VariableAssignment;
    constructor(name: string, value: VerbatimString | QuotedString | Word | Variable);
    stringify(env: Environment, collapseWhitespace?: boolean): string;
    toString(): string;
}
