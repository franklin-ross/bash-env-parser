import { Variable } from "../../tokens";
/** Localise the variables in a tree for a kind of shell ("sh" and "bash" are synonymous.) */
export declare function localiseVariables(token: any, localise: "sh" | "bash" | "cmd" | ((token: Variable) => any)): any | null;
/** Gets the variable localiser for a given shell. */
export declare function getLocaliser(shell: "sh" | "bash" | "cmd" | ((token: Variable) => any)): (token: Variable) => any;
