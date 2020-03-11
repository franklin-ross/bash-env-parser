import { Variable } from "./Variable";
import { VariableAssignment } from "./VariableAssignment";
import { QuotedString } from "./QuotedString";
import { VerbatimString } from "./VerbatimString";
import { Word } from "./Word";
import { Whitespace } from "./Whitespace";

export * from "./infrastructure";
export { Variable } from "./Variable";
export { VariableAssignment } from "./VariableAssignment";
export { QuotedString } from "./QuotedString";
export { VerbatimString } from "./VerbatimString";
export { Word } from "./Word";
export { Whitespace } from "./Whitespace";

/** Union of token types which are produced by the parser. */
export type ParseToken =
  | Variable
  | VariableAssignment
  | Word
  | QuotedString
  | VerbatimString
  | Whitespace;

/** Union of token types handled by transforms. */
export type Token = string | ParseToken;
