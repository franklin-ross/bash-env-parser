import { TransformChildren } from "./infrastructure";
/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export declare class QuotedString {
    readonly contents: any[];
    constructor(contents: any[]);
    toString(): string;
    [TransformChildren](transformer: (item: any) => any): QuotedString;
}
