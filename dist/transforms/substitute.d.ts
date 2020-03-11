import { Token } from "../tokens";
import { Environment } from "../Environment";
export declare function substitute(token: Token, env: Environment, inlineAssignment?: boolean): Token;
export declare function substitute(token: readonly Token[], env: Environment, inlineAssignment?: boolean): readonly Token[];
export declare function substitute(token: Token | readonly Token[], env: Environment, inlineAssignment?: boolean): Token | readonly Token[];
