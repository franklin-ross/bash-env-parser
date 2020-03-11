import { VariableAssignment, transformChildren, Token } from "../tokens";
import { Environment } from "../Environment";
import { stringify } from "./stringify";
import { collapseWhitespace } from "./collapseWhitespace";
import { substitute } from "./substitute";

/** Assigns any variable assignment tokens into the environment. If their value has not yet been
 * substituted then the environment at that step is used. Note that the usual order for bash is to
 * first substitute all tokens up front, then assign variables. If that ordering is preferred then
 * call @see substitute() on the tree first. */
export function extractEnvironment(
  token: null | Token | readonly Token[],
  env: Environment = {}
): Environment {
  if (token != null) {
    extract(token);
  }
  return env;

  function extract(t: Token | readonly Token[]) {
    if (t instanceof VariableAssignment) {
      const substitutedValue = substitute(t.value, env, false);
      const collapsedValue = collapseWhitespace(substitutedValue);
      const stringValue = stringify(collapsedValue);
      if (stringValue !== "") {
        env[t.name] = stringValue;
      }
    } else {
      transformChildren(t, extract);
    }
    return t;
  }
}
