import { TransformChildren } from "./Symbols";

interface IHaveChildren {
  [TransformChildren](transformer: (item: any) => any): this;
}

/** Transform an array, returning a new array if any children change. */
export function transformChildren<T>(
  value: T[],
  transformer: (item: any) => any
): T[];

/** If the value provides support for transforming it's children, then transform them. */
export function transformChildren<T extends IHaveChildren>(
  value: T,
  transformer: (item: any) => any
): T;

/** Transform an object's children if it supports it. */
export function transformChildren(
  value: any,
  transformer: (item: any) => any
): any;

export function transformChildren(
  value: any,
  transformer: (item: any) => any
): any {
  if (value != null) {
    if (Array.isArray(value)) {
      return transformArray(value, transformer);
    }
    if (
      typeof value === "object" &&
      typeof value[TransformChildren] === "function"
    ) {
      return (value[TransformChildren] as any)(transformer);
    }
  }
  return value;
}

function transformArray(value: any[], transformer: (item: any) => any) {
  // Scan through the children until the transform function changes one of them.
  for (let i = 0, len = value.length; i < len; ++i) {
    let item = value[i];
    let transformed = transformer(item);
    if (item === transformed) continue;

    // Once a child has changed: create a new list, apply the changes, and return it.
    const newList = value.slice(0, i);
    const pusher = push;
    pusher(newList, transformed);
    ++i;
    for (; i < len; ++i) {
      item = value[i];
      transformed = transformer(item);
      pusher(newList, transformed);
    }
    return newList;
  }

  // When there are no changes, return this object.
  return value;
}

/** Push an item, or flatten an array of items into the list argument. */
function push(list: any[], items: any) {
  if (items != null) {
    if (Array.isArray(items)) {
      list.push(...items);
    } else {
      list.push(items);
    }
  }
}
