{
  const process = {
    env: {
      BOB: "Hello!"
    }
  };

  function getEnv(name, fallback) {
     const env = process.env[name];
     return (env == null || env === '')
     	? (fallback == null ? '' : fallback)
        : env;
  }
}

start
  = String

String = QuotedString / UnquotedString

EnvVar
  = "${" _ name:VarName _ (":-" / ":=") fallback:FallbackValue "}" { return getEnv(name, fallback); }
  / "${" _ name:VarName _ "}" { return getEnv(name); }
  / "$" name:VarName { return getEnv(name); }
  / "$" { return "$"; }

FallbackValue
  = QuotedString
  / val:((BracketStringChar / EnvVar)*) { return val.join('').trim(); }

VarName "environment variable name"
  = [a-zA-Z_][a-zA-z_0-9]+ { return text(); }

_ "whitespace"
  = [ \t\n\r\v]*

QuotedString
  = '"' val:(DoubleStringChar / EnvVar)* '"' { return val.join(''); }
  / "'" val:(SingleStringChar / EnvVar)* "'" { return val.join(''); }

UnquotedString
  = val:(BareStringChar / EnvVar)* { return val.join(''); }

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