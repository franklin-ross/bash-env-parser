import { TransformChildren } from "./infrastructure";
/** A variable after being substituted for it's value. */
export declare class SubstitutedVariable {
    /** The name of the parameter or symbol being substituted. */
    readonly name: string;
    /** The value to be substituted in place of this parameter or symbol. May be null when there's
     * no matching symbol in an environment, a string containing the value in an environment, or a
     * token which may contain other substituted parameters. */
    readonly value: any;
    constructor(
    /** The name of the parameter or symbol being substituted. */
    name: string, 
    /** The value to be substituted in place of this parameter or symbol. May be null when there's
     * no matching symbol in an environment, a string containing the value in an environment, or a
     * token which may contain other substituted parameters. */
    value: any);
    toString(): string;
    [TransformChildren](transformer: (token: any) => any): SubstitutedVariable;
}
