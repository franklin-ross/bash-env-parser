import x, { Parser } from "pegjs";

const parser = require("./parser.pegjs") as Parser;

console.log(parser.parse("$BOB"));

export = parser.parse;
