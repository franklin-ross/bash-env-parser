import { Variable } from "./Variable";
import { VariableAssignment } from "./VariableAssignment";
import { SubstitutedVariable } from "./SubstitutedVariable";
import { QuotedString } from "./QuotedString";
import { VerbatimString } from "./VerbatimString";
import { Word } from "./Word";
import { List } from "./List";
import { Whitespace } from "./Whitespace";
export { TokenKind } from "./TokenKind";

type Token =
  | List
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
  List,
  Token,
  Whitespace
};
