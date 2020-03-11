import { transformChildren } from "../tokens";

/** Returns a new tree with any matching tokens removed. */
export function filter<T>(
  token: T,
  shouldRemove: (token: any) => boolean
): T | null {
  function strip(t: any) {
    if (shouldRemove(t)) return null;
    return transformChildren(t, strip);
  }
  return strip(token);
}
