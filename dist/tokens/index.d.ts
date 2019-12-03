import { Variable } from "./Variable";
import { QuotedString } from "./QuotedString";
import { VerbatimString } from "./VerbatimString";
import { Word } from "./Word";
import { List } from "./List";
export { TokenKind } from "./TokenKind";
declare type Token = List | Variable | Word | QuotedString | VerbatimString;
export { Variable, QuotedString, VerbatimString, Word, List, Token };
