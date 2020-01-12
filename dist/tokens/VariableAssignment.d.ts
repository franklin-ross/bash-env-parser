import { TransformChildren } from "./infrastructure";
/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export declare class VariableAssignment {
    readonly name: string;
    readonly value: any;
    constructor(name: string, value: any);
    toString(): string;
    [TransformChildren](transformer: (token: any) => any): VariableAssignment;
}
