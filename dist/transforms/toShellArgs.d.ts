import { Variable, VariableAssignment, Token } from "../tokens";
/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export declare function toShellArgs(token: ReadonlyArray<Token>): string[];
/** Unsubstituted variables are stripped from shell args. */
export declare function toShellArgs(token: Variable | VariableAssignment): null;
/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export declare function toShellArgs(token: Token): string;
