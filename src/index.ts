import { Parser } from "pegjs";
import { Token } from "./tokens";

const parser = require("./parser.pegjs") as Parser;

export * from "./tokens";

/** Parses the text for bash style environment variables. */
export default (text: string) => parser.parse(text) as Token;
