import { TransformChildren, transformChildren } from "./infrastructure";

/** A variable after being substituted for it's value. */
export class SubstitutedVariable {
  constructor(
    /** The name of the parameter or symbol being substituted. */
    public readonly name: string,
    /** The value to be substituted in place of this parameter or symbol. May be null when there's
     * no matching symbol in an environment, a string containing the value in an environment, or a
     * token which may contain other substituted parameters. */
    public readonly value: any
  ) {}

  toString(): string {
    let value = this.value;
    if (value) {
      value = typeof value === "string" ? value : value.toString();
    }
    return "${" + this.name + "=" + value + "}";
  }

  [TransformChildren](transformer: (token: any) => any) {
    const contents = this.value;
    const transformed = transformChildren(contents, transformer);
    return transformed !== contents
      ? new SubstitutedVariable(this.name, transformed)
      : this;
  }
}
