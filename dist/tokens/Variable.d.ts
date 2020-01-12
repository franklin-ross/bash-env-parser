import { TransformChildren } from "./infrastructure";
/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export declare class Variable {
    readonly name: string;
    readonly fallbackType: null | ":-" | ":=";
    readonly fallback: any;
    constructor(name: string, fallbackType?: null | ":-" | ":=", fallback?: any);
    toString(): string;
    [TransformChildren](transformer: (token: any) => any): Variable;
}
