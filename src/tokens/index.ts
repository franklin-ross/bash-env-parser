import { Variable } from "./Variable";
import { QuotedString } from "./QuotedString";
import { VerbatimString } from "./VerbatimString";
import { Word } from "./Word";
import { List } from "./List";
import { Whitespace } from "./Whitespace";
export { TokenKind } from "./TokenKind";

type Token =
  | List
  | Variable
  | Word
  | QuotedString
  | VerbatimString
  | Whitespace;

export {
  Variable,
  QuotedString,
  VerbatimString,
  Word,
  List,
  Token,
  Whitespace
};
