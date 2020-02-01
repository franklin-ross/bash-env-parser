import { VariableAssignment, transformChildren } from "../tokens";
import { Environment } from "../Environment";
import { stringify } from "./stringify";
import { collapseWhitespace } from "./collapseWhitespace";
import { substitute } from "./substitute";

/** Assigns any variable assignment tokens into the environment. If their value has not yet been
 * substituted then the environment at that step is used. Note that the usual order for bash is to
 * first substitute all tokens up front, then assign variables. If that ordering is preferred then
 * call @see substitute() on the tree first. */
export function extractEnvironment(
  token: any,
  env: Environment = {}
): Environment {
  function extract(t: any) {
    if (t instanceof VariableAssignment) {
      const substitutedValue = substitute(t.value, env, false);
      const collapsedValue = collapseWhitespace(substitutedValue);
      const stringValue = stringify(collapsedValue);
      env[t.name] = stringValue;
    } else {
      transformChildren(t, extract);
    }
    return t;
  }

  extract(token);
  return env;
}
