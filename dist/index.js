"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_pegjs_1 = __importDefault(require("./parser.pegjs"));
__export(require("./tokens"));
/** Parses the text for bash style environment variables. */
exports.default = (text) => parser_pegjs_1.default.parse(text);
//# sourceMappingURL=index.js.map