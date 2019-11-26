import { Parser } from "pegjs";

const parser = require("./parser.js") as Parser;

console.log(parser.parse("$BOB"));
