import { transformChildren, TransformChildren } from "./infrastructure";

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

  [TransformChildren](transformer: (token: any) => any) {
    const contents = this.fallback;
    const transformed = transformChildren(contents, transformer);
    return transformed !== contents
      ? new Variable(this.name, this.fallbackType, transformed)
      : this;
  }
}
