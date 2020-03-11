import { transformChildren } from "../tokens";

/** Returns whether the token or any children match a test function. */
export function some<T>(token: T, test: (token: any) => boolean): T | null {
  let found = false;
  function doSome(t: any) {
    if (found || (found = test(t))) return t;
    return transformChildren(t, doSome);
  }
  return doSome(token);
}
