"use strict";
exports.__esModule = true;
/** Joins consecutive strings in the input, but leaves any tokens.. */
function collapse(contents) {
    var result = [];
    var builder = "";
    for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
        var x = contents_1[_i];
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
