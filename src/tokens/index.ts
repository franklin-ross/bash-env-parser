import { Variable } from "./Variable";
import { VariableAssignment } from "./VariableAssignment";
import { SubstitutedVariable } from "./SubstitutedVariable";
import { QuotedString } from "./QuotedString";
import { VerbatimString } from "./VerbatimString";
import { Word } from "./Word";
import { Whitespace } from "./Whitespace";
export * from "./infrastructure";

/** All tokens that come with this library. */
export type BuiltinToken =
  | Variable
  | VariableAssignment
  | SubstitutedVariable
  | Word
  | QuotedString
  | VerbatimString
  | Whitespace;

export {
  Variable,
  VariableAssignment,
  SubstitutedVariable,
  QuotedString,
  VerbatimString,
  Word,
  Whitespace
};
