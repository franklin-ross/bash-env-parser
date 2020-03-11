import { TransformChildren } from "./Symbols";
import { Token } from "..";

/** A function for transforming a token. */
export type ITokenTransform = (
  item: Token
) => null | undefined | Token | ReadonlyArray<Token>;

/** Transform an array, returning a new array if any children change.
 * @param value The array to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.
 */
export function transformChildren(
  value: ReadonlyArray<Token>,
  transformer: ITokenTransform
): ReadonlyArray<Token>;

/** Transform an object's children if it supports it.
 * @param value The object which may have children to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.*/
export function transformChildren(
  value: Token,
  transformer: ITokenTransform
): Token;

/** Transform an array or an object's children if it supports it.
 * @param value The object or array which may have children to transform.
 * @param transformer The function to use to transform each child. Return a nullish value to remove
 * the child, an array to replace it with multiple new items, or the original child.*/
export function transformChildren(
  value: Token | ReadonlyArray<Token>,
  transformer: ITokenTransform
): Token | ReadonlyArray<Token>;

export function transformChildren(
  value: Token | ReadonlyArray<Token>,
  transformer: ITokenTransform
): Token | ReadonlyArray<Token> {
  if (Array.isArray(value)) {
    return transformArray(value, transformer);
  } else if (typeof (value as any)?.[TransformChildren] === "function") {
    return (value as any)[TransformChildren](transformer);
  }
  return value;
}

/** Transforms an array, returning a new array only if any elements change. Nullish transform
 * results are removed, and array transform results are flattened (by one level only.) */
function transformArray(
  value: ReadonlyArray<Token>,
  transformer: ITokenTransform
): ReadonlyArray<Token> {
  // Scan through the children until the transform function changes one of them.
  for (let i = 0, len = value.length; i < len; ++i) {
    let item = value[i];
    let transformed = transformer(item);
    if (item === transformed) continue;

    // Once a child has changed: create a new list, apply the changes, and return it.
    const newList = value.slice(0, i);
    push(newList, transformed);
    for (++i; i < len; ++i) {
      item = value[i];
      transformed = transformer(item);
      push(newList, transformed);
    }
    return newList;
  }

  // When there are no changes, return this object.
  return value;
}

/** Push an item, or flatten an array of items into the list argument, removing nullish values. */
function push(
  list: Token[],
  items: null | undefined | Token | ReadonlyArray<null | undefined | Token>
) {
  if (items != null) {
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item != null) {
          list.push(item);
        }
      }
    } else {
      list.push(items as Token);
    }
  }
}
