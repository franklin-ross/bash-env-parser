import { Token, Variable, List } from "../tokens";
/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export declare function toShellArgs(token: List): string[];
/** Unsubstituted variables are stripped from shell args. */
export declare function toShellArgs(token: Variable): null;
/** Convert the token list into an array of strings suitable for passing to a shell process as args.
 */
export declare function toShellArgs(token: Token): string;