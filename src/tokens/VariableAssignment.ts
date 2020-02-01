import { TransformChildren, transformChildren } from "./infrastructure";

/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export class VariableAssignment<T = any> {
  constructor(public readonly name: string, public readonly value: T) {}

  toString() {
    return this.name + "=" + this.value;
  }

  /** Clones this with a new value, unless the value is unchanged. */
  withValue(newValue: T): VariableAssignment<T>;
  /** Clones this with a new value, unless the value is unchanged. */
  withValue<U>(newValue: U): VariableAssignment<U>;
  withValue(newValue: any) {
    return this.value === newValue
      ? this
      : new VariableAssignment(this.name, newValue);
  }

  [TransformChildren](transformer: (token: any) => any) {
    const contents = this.value;
    const transformed = transformChildren(contents, transformer);
    return transformed !== contents
      ? new VariableAssignment(this.name, transformed)
      : this;
  }
}
