import { Token, Variable, SubstitutedVariable } from "../tokens";
/** Variables which have not been substituted are stripped when converting to a string. */
export declare function stringify(token: Variable): null;
/** Variables which didn't match during substitution are stripped when converting to a string. */
export declare function stringify(token: SubstitutedVariable): string | null;
/** Converts a token to a string. Whitespace is concatenated verbatim and quoted strings are
 * expanded to their content, without the quotes. Variables which haven't been substituted are
 * stripped. */
export declare function stringify(token: Token): string;
