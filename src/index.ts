import { Token } from "./tokens";
import parser from "./parser.pegjs";

export * from "./tokens";

/** Parses the text for bash style environment variables. */
export default (text: string) => parser.parse(text) as Token;
