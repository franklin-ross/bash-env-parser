import { Whitespace, SubstitutedVariable } from "../tokens";
export declare function collapseWhitespace(token: SubstitutedVariable): SubstitutedVariable | null;
export declare function collapseWhitespace(token: Whitespace): Whitespace | null;
export declare function collapseWhitespace<T>(token: T): T;
