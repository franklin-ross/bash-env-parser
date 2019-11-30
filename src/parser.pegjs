{
  const { QuotedString, VerbatimString, Variable, Word, List, Whitespace } = require('./tokens')
}

start = tokens:RootToken* { return new List(tokens); }

RootToken = VerbatimString / QuotedString / Variable / Word / Whitespace

Variable
  = "${" name:VarName fallbackType:(":-" / ":=") fallback:Fallback "}" {
    return new Variable(name, fallbackType, fallback);
  }
  / "${" name:VarName "}" { return new Variable(name); }
  / "$" name:VarName { return new Variable(name); }

Fallback
  = tokens:(VerbatimString / QuotedString / Variable / WordInBrace / Whitespace)* {
    return tokens.length === 1 ? tokens[0] : new List(tokens);
  }

VarName "variable name"
  = [a-zA-Z_][a-zA-z_0-9]+ { return text(); }

Whitespace = [ \t\n\r]+ { return new Whitespace(text()); }

VerbatimString = "'" chars:SingleStringChar* "'" {
    return new VerbatimString(chars.join(""));
  }

QuotedString = '"' chars:(Variable / DoubleStringChar+)* '"' {
    return new QuotedString(chars);
  }

Word = chars:BareStringChar+ { return new Word(chars.join("")); }

WordInBrace = chars:BraceStringChar+ { return new Word(chars.join("")); }

DoubleStringChar
  = '\\' escaped:("$" / '"') { return escaped; }
  / !'"' char:. { return char; }

SingleStringChar
  = "\\" escaped:("'") { return escaped; }
  / !"'" char:. { return char; }

BraceStringChar
  = "\\" escaped:("$" / "}") { return escaped; }
  / !("}" / Whitespace) char:. { return char; }

BareStringChar
  = "\\" escaped:("$") { return escaped; }
  / !Whitespace char:. { return char; }