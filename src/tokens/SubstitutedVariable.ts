import { TransformChildren, transformChildren } from "./infrastructure";
import { Variable } from ".";

/** A variable after being substituted for it's value. */
export class SubstitutedVariable<T = any> {
  constructor(
    /** The original variable this was substituted from. */
    public readonly variable: Variable,
    /** The value to be substituted in place of this parameter or symbol. May be null when there's
     * no matching symbol in an environment, a string containing the value in an environment, or a
     * token which may contain other substituted parameters. */
    public readonly value: T
  ) {}

  /** The name of the parameter or symbol being substituted. */
  get name() {
    return this.variable.name;
  }

  toString(): string {
    return "${" + this.name + "=" + this.value + "}";
  }

  /** Clones this with a new value, unless the value is unchanged. */
  withValue(newValue: T): SubstitutedVariable<T>;
  /** Clones this with a new value, unless the value is unchanged. */
  withValue<U>(newValue: U): SubstitutedVariable<U>;
  withValue(newValue: any) {
    return this.value === newValue
      ? this
      : new SubstitutedVariable(this.variable, newValue);
  }

  [TransformChildren](transformer: (token: any) => any) {
    const transformed = transformChildren(this.value, transformer);
    return this.withValue(transformed);
  }
}
