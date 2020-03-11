import { TransformChildren } from "./Symbols";
interface IHaveChildren {
    [TransformChildren](transformer: (item: any) => any): this;
}
/** Transform an array, returning a new array if any children change.
 * @param value The array to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.
 */
export declare function transformChildren<T>(value: ReadonlyArray<T>, transformer: (item: any) => any): ReadonlyArray<T>;
/** If the value provides support for transforming it's children, then transform them.
 * @param value The array to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.*/
export declare function transformChildren<T extends IHaveChildren>(value: T, transformer: (item: any) => any): T;
/** Transform an object's children if it supports it.
 * @param value The array to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.*/
export declare function transformChildren(value: any, transformer: (item: any) => any): any;
export {};
