import { TransformChildren, ITokenTransform } from "./infrastructure";
import { Token } from ".";
/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export declare class Variable {
    readonly name: string;
    readonly fallbackType: null | ":-" | ":=";
    readonly fallback: null | Token | ReadonlyArray<Token>;
    constructor(name: string, fallbackType?: null | ":-" | ":=", fallback?: null | Token | ReadonlyArray<Token>);
    /** Stringifies the variable into it's bash version, including fallback. */
    toString(): string;
    [TransformChildren](transformer: ITokenTransform): Variable | null;
}
