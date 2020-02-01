import { transformChildren, TransformChildren } from "./infrastructure";
import { SubstitutedVariable } from "./SubstitutedVariable";

/** A variable reference like $VAR, ${VAR}, or ${VAR:-fallback}. */
export class Variable {
  constructor(
    public readonly name: string,
    public readonly fallbackType: null | ":-" | ":=" = null,
    public readonly fallback: any = null
  ) {}

  toString() {
    return (
      "${" + this.name + (this.fallbackType ?? "") + (this.fallback ?? "") + "}"
    );
  }

  /** Creates a new @see SubstitutedVariable for from this, with the provided value. */
  substitute<T>(value: T): SubstitutedVariable<T> {
    return new SubstitutedVariable(this, value);
  }

  [TransformChildren](transformer: (token: any) => any) {
    const contents = this.fallback;
    const transformed = transformChildren(contents, transformer);
    return transformed !== contents
      ? new Variable(this.name, this.fallbackType, transformed)
      : this;
  }
}
