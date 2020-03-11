/** Converts a token to a string. Whitespace is concatenated verbatim and quoted strings are
 * expanded to their content, without the quotes. Variables which haven't been substituted are
 * stripped. */
export declare function stringify(token: any): string;
