import { terser } from "rollup-plugin-terser";
import { name } from "./package.json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import tsc from "typescript";
import pegjs from "rollup-plugin-pegjs";

const BUILD = process.env.BUILD || process.env.NODE_ENV;

/** @type {import('rollup').RollupOptions} */
const options = {
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
      // I need to use a require() in the grammar to import the tokens, and can't use es6
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
      sourcemapExcludeSources: true,
      name,
      plugins: [
        onlyIn("production", () =>
          terser({
            compress: true,
            mangle: true,
            toplevel: false
          })
        )
      ]
    }
  ]
};

export default [options];

function notIn(env, factory) {
  if (BUILD === env) return null;
  return factory();
}
function onlyIn(env, factory) {
  if (BUILD !== env) {
    return null;
  }
  return factory();
}
