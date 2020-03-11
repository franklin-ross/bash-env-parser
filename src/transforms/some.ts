import { transformChildren, Token } from "../tokens";

/** Returns whether the token or any children match a test function. */
export function some(
  token: Token | readonly Token[],
  isMatch: (token: Token | readonly Token[]) => boolean
): boolean {
  let found = false;

  if (Array.isArray(token)) {
    transformChildren(token, doSome);
  } else {
    doSome(token as Token);
  }

  return found;

  function doSome(t: Token) {
    if (found || (found = isMatch(t))) return t;
    return transformChildren(t, doSome);
  }
}
