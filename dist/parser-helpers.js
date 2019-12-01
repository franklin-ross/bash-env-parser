"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Joins consecutive strings in the input, but leaves any tokens.. */
function collapse(contents) {
    const result = [];
    let builder = "";
    for (const x of contents) {
        if (typeof x === "string") {
            builder += x;
        }
        else {
            if (builder.length > 0) {
                result.push(builder);
                builder = "";
            }
            result.push(x);
        }
    }
    if (builder.length > 0) {
        result.push(builder);
    }
    return result;
}
exports.collapse = collapse;
