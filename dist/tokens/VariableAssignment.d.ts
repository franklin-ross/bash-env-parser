import { TransformChildren } from "./infrastructure";
/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export declare class VariableAssignment<T = any> {
    readonly name: string;
    readonly value: T;
    constructor(name: string, value: T);
    toString(): string;
    /** Clones this with a new value, unless the value is unchanged. */
    withValue(newValue: T): VariableAssignment<T>;
    /** Clones this with a new value, unless the value is unchanged. */
    withValue<U>(newValue: U): VariableAssignment<U>;
    [TransformChildren](transformer: (token: any) => any): VariableAssignment<any>;
}
