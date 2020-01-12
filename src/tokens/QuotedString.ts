import { TransformChildren, transformChildren } from "./infrastructure";

/** Text quoted with double quotes: ". Variables substitution is performed in these strings and
 * whitespace is preserved, but no other characters like ' have any special meaning. */
export class QuotedString {
  constructor(public readonly contents: any[]) {}

  toString() {
    return `"${this.contents}"`;
  }

  [TransformChildren](transformer: (item: any) => any) {
    const contents = this.contents;
    const transformed = transformChildren(contents, transformer);
    return transformed !== contents ? new QuotedString(transformed) : this;
  }
}
