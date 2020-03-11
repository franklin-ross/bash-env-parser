import { BuiltinToken } from "../tokens";
import { Environment } from "../Environment";
export declare function substitute(token: readonly BuiltinToken[], env: Environment, inlineAssignment?: boolean): BuiltinToken[];
