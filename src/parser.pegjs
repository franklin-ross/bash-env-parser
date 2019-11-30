{
  const { StringToken, QuotedStringToken, VariableToken } = require('./tokens')
  const { unwrap, join } = require('./parser-helpers')
}

start
  = String

String = QuotedString / UnquotedString

EnvVar
  = "${" name:VarName fallbackType:(":-" / ":=") fallback:FallbackValue "}" {
    return new VariableToken(name, fallbackType, fallback);
  }
  / "${" name:VarName "}" { return new VariableToken(name); }
  / "$" name:VarName { return new VariableToken(name); }
  / "$" { return "$"; }

FallbackValue
  = QuotedString
  / val:((BracketStringChar / EnvVar)*) { return unwrap(new StringToken(join(val))); }

VarName "environment variable name"
  = [a-zA-Z_][a-zA-z_0-9]+ { return text(); }

_ "whitespace"
  = [ \t\n\r\v]*

QuotedString
  = '"' val:(DoubleStringChar / EnvVar)* '"' {
    return unwrap(new QuotedStringToken(join(val), '"'));
  }
  / "'" val:(SingleStringChar / EnvVar)* "'" {
    return unwrap(new QuotedStringToken(join(val), "'"));
  }

UnquotedString
  = val:(BareStringChar / EnvVar)* { return unwrap(new StringToken(join(val))); }

DoubleStringChar
  = '\\' escaped:("$" / '"') { return escaped; }
  / !("$" / '"') char:. { return char; }

SingleStringChar
  = "\\" escaped:("$" / "'") { return escaped; }
  / !("$" / "'") char:. { return char; }

BracketStringChar
  = "\\" escaped:("$" / "}") { return escaped; }
  / !("$" / "}") char:. { return char; }

BareStringChar
  = "\\" escaped:("$") { return escaped; }
  / !("$") char:. { return char; }