"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var parser_pegjs_1 = __importDefault(require("./parser.pegjs"));
__export(require("./tokens"));
/** Parses the text for bash style environment variables. */
exports["default"] = (function (text) { return parser_pegjs_1["default"].parse(text); });
