import {
  transformChildren,
  TransformChildren,
  ITokenTransform
} from "./infrastructure";
import { Token } from ".";

/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export class Variable {
  constructor(
    public readonly name: string,
    public readonly fallbackType: null | ":-" | ":=" = null,
    public readonly fallback: null | Token | ReadonlyArray<Token> = null
  ) {}

  /** Stringifies the variable into it's bash version, including fallback. */
  toString() {
    return (
      "${" + this.name + (this.fallbackType ?? "") + (this.fallback ?? "") + "}"
    );
  }

  [TransformChildren](transformer: ITokenTransform) {
    const contents = this.fallback;
    if (contents == null) return contents;
    const transformed = transformChildren(contents, transformer);
    return transformed !== contents
      ? new Variable(this.name, this.fallbackType, transformed)
      : this;
  }
}
