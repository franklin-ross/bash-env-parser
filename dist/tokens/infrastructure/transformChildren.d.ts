import { Token } from "..";
/** A function for transforming a token. */
export declare type ITokenTransform = (item: Token) => null | undefined | Token | ReadonlyArray<Token>;
/** Transform an array, returning a new array if any children change.
 * @param value The array to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.
 */
export declare function transformChildren(value: ReadonlyArray<Token>, transformer: ITokenTransform): ReadonlyArray<Token>;
/** Transform an object's children if it supports it.
 * @param value The object which may have children to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.*/
export declare function transformChildren(value: Token, transformer: ITokenTransform): Token;
/** Transform an array or an object's children if it supports it.
 * @param value The object or array which may have children to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.*/
export declare function transformChildren(value: Token | ReadonlyArray<Token>, transformer: ITokenTransform): Token | ReadonlyArray<Token>;
