# bash-env-parser

Parse/replace bash style variable substitutions with support for default values.

## Install

`npm install franklin-ross/bash-env-parser`

I'll publish an npm package soon after some feedback.

## Examples

```js
import { replace } from "bash-env-parser";

const env = {
  FOO: "bar",
  NAME: "Franklin Ross"
  INDENT: "    "
};

expect(replace("$FOO", env).toBe("bar");
expect(replace("${DEFAULT:-${VALUES:-Defaults!}}", env)
         .toBe("Defaults!");
expect(replace("Hi, my name is $NAME", env)
         .toBe("Hi, my name is Franklin Ross");
expect(replace('  Spaces    to  \t collapse', env)
         .toBe('Spaces to collapse');
expect(replace('Double quotes "to${INDENT}work"', env)
         .toBe('Double quotes to    work');
expect(replace("Single quotes 'to   work $FOO'", env)
         .toBe("Single quotes to   work $FOO");
```

It's also possible to get the parse tree for inspection. If you want to parse an
expression and then convert it into a string multiple times with different
environments, it's also more efficient to split the parse and stringify steps.

```js
import { parse } from "bash-env-parser";

const syntaxTree = parse("My $EXPRESSION");
syntaxTree.stringify({ EXPRESSION: "doughnut" });
```

## Accuracy

This is intended to have identical behaviour to bash. File an issue if you find
that's not the case.

## References

- https://www.gnu.org/software/bash/manual/bash.html
- http://www.tldp.org/LDP/abs/html/index.html

## Prior Art

A quick search of the npm package registry nets a fair number of packages which
do similar things, but I couldn't find any which supported default values. The
ones I looked at also tended to use regular expressions for parsing, which gets
tricky if you want to nest variables within the default values of other
variables. For these reasons I set out to create a library using a parsing
expression grammar to do the heavy lifting.
