import { Token, Variable } from "../tokens";
import { Environment } from "../Environment";
import { SubstitutedVariable } from "../tokens/SubstitutedVariable";
export declare function substitute(token: Variable, env: Environment, localVariableAssignment?: boolean): SubstitutedVariable;
export declare function substitute<T extends Token>(token: T, env: Environment, localVariableAssignment?: boolean): T;
