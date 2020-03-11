import { TransformChildren } from "./infrastructure";
import { Token } from ".";
/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export declare class VariableAssignment {
    readonly name: string;
    readonly value: Token | ReadonlyArray<Token>;
    constructor(name: string, value: Token | ReadonlyArray<Token>);
    toString(): string;
    /** Clones this with a new value, unless the value is unchanged. */
    withValue(newValue: Token | readonly Token[]): VariableAssignment;
    [TransformChildren](transformer: (token: any) => any): VariableAssignment;
}
