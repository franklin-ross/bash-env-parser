import { TransformChildren } from "./infrastructure";
import { Variable } from ".";
/** A variable after being substituted for it's value. */
export declare class SubstitutedVariable<T = any> {
    /** The original variable this was substituted from. */
    readonly variable: Variable;
    /** The value to be substituted in place of this parameter or symbol. May be null when there's
     * no matching symbol in an environment, a string containing the value in an environment, or a
     * token which may contain other substituted parameters. */
    readonly value: T;
    constructor(
    /** The original variable this was substituted from. */
    variable: Variable, 
    /** The value to be substituted in place of this parameter or symbol. May be null when there's
     * no matching symbol in an environment, a string containing the value in an environment, or a
     * token which may contain other substituted parameters. */
    value: T);
    /** The name of the parameter or symbol being substituted. */
    get name(): string;
    toString(): string;
    /** Clones this with a new value, unless the value is unchanged. */
    withValue(newValue: T): SubstitutedVariable<T>;
    /** Clones this with a new value, unless the value is unchanged. */
    withValue<U>(newValue: U): SubstitutedVariable<U>;
    [TransformChildren](transformer: (token: any) => any): SubstitutedVariable<any>;
}
