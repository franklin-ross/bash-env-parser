import { Token } from "./tokens";
/** Joins consecutive strings in the input, but leaves any tokens.. */
export declare function collapse(contents: Array<string | Token>): (string | import("./tokens").Variable | import("./tokens").List | import("./tokens").Word | import("./tokens").QuotedString | import("./tokens").VerbatimString)[];
