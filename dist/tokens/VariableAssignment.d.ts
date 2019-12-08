import { TokenKind, List, VerbatimString, QuotedString, Word } from ".";
import { Variable } from "./Variable";
/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export declare class VariableAssignment {
    readonly name: string;
    readonly value: List | Word | VerbatimString | QuotedString | Variable;
    readonly kind: TokenKind.VariableAssignment;
    constructor(name: string, value: List | Word | VerbatimString | QuotedString | Variable);
    toString(): string;
}
