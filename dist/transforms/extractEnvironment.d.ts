import { Token } from "../tokens";
import { Environment } from "../Environment";
/** Assigns any variable assignment tokens into the environment. If their value has not yet been
 * substituted then the environment at that step is used. Note that the usual order for bash is to
 * first substitute all tokens up front, then assign variables. If that ordering is preferred then
 * call @see substitute() on the tree first. */
export declare function extractEnvironment(token: Token, env?: Environment): Environment;
