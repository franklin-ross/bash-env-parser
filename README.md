# bash-env-parser

Parse/replace bash style variables substitutions with support for default
values.

## Prior Art

A quick search of the npm package registry nets a fair number of packages which
do similar things, but I couldn't find any which supported default values. The
ones I looked at also tended to use regular expressions for parsing, which gets
tricky if you want to nest variables within the default values of other
variables. For these reasons I set out to create a library using a parsing
expression grammar to do the heavy lifting.
