{
  const { QuotedString, VerbatimString, Variable, Word, List, Whitespace } = require('./tokens');
}

start = tokens:RootToken* { return new List(tokens); }

RootToken = VerbatimString / QuotedString / Word / Variable / Whitespace

Variable
  = "${" name:VarName fallbackType:(":-" / ":=") fallback:Fallback "}" {
    return new Variable(name, fallbackType, fallback);
  }
  / "${" name:VarName "}" { return new Variable(name); }
  / "$" name:VarName { return new Variable(name); }
  / "$" { return new VerbatimString("$"); }

Fallback
  = tokens:(VerbatimString / QuotedString / WordInBrace / Variable / Whitespace)* {
    return tokens.length === 1 ? tokens[0] : new List(tokens);
  }

VarName "variable name"
  = [a-zA-Z_][a-zA-z_0-9]+ { return text(); }

Whitespace = [ \t\n\r]+ { return new Whitespace(text()); }

VerbatimString = "'" chars:VerbatimChars "'" {
    return new VerbatimString(chars);
  }

QuotedString = '"' tokens:(QuotedChars / Variable)* '"' {
    return new QuotedString(tokens);
  }

Word = chars:BareStringChar+ { return new Word(chars.join("")); }
WordInBrace = chars:BraceStringChar+ { return new Word(chars.join("")); }
VerbatimChars = chars:SingleStringChar+ { return chars.join(""); }
QuotedChars = chars:DoubleStringChar+ { return chars.join(""); }

DoubleStringChar
  = '\\' escaped:[$"`\\] { return escaped; } // https://www.gnu.org/software/bash/manual/bash.html#Double-Quotes
  / '\\\n' { return ""; }
  / ![$"] char:. { return char; }
SingleStringChar = !"'" char:. { return char; }
BraceStringChar  = Escaped / !("$" / "}" / Whitespace) char:. { return char; }
BareStringChar   = Escaped / !("$" / Whitespace) char:. { return char; }

Escaped
  = '\\\n' { return ""; }
  / "\\" escaped:. { return escaped; }