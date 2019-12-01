import { terser } from "rollup-plugin-terser";
import { name } from "./package.json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import tsc from "typescript";
import pegjs from "rollup-plugin-pegjs";

export default [
  {
    input: "src/index.ts",
    plugins: [
      typescript({
        typescript: tsc,
        tsconfigOverride: {
          exclude: ["node_modules", "test"],
          compilerOptions: { module: "es2015" }
        },
        clean: true // Don't know why, but I get build errors otherwise.
      }),
      pegjs({
        // I need to use use a require() in the grammar to import the tokens, and can't use es6
        // imports because they end up in the middle of the file somewhere which isn't allowed. The
        // pegjs output needs to be entirely in cjs format so the commonjs plugin can convert it to
        // es6 modules. If it contains any es6 module syntax, it won't be converted.
        format: "commonjs",
        target: "cjs"
      }),
      commonjs({
        extensions: [".js", ".ts", ".pegjs"]
      })
    ],
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
        name,
        plugins: [
          terser({
            compress: true,
            mangle: true,
            toplevel: false
          })
        ]
      }
    ]
  }
];
