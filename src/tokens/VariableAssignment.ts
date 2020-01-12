import { TransformChildren, transformChildren } from "./infrastructure";

/** A variable assignment like VAR=5, VAR="hello", or VAR=${OTHER}. */
export class VariableAssignment {
  constructor(public readonly name: string, public readonly value: any) {}

  toString() {
    return this.name + "=" + this.value;
  }

  [TransformChildren](transformer: (token: any) => any) {
    const contents = this.value;
    const transformed = transformChildren(contents, transformer);
    return transformed !== contents
      ? new VariableAssignment(this.name, transformed)
      : this;
  }
}
