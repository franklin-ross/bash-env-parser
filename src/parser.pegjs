{
  const {
    QuotedString,
    VerbatimString,
    Variable,
    VariableAssignment,
    Word,
    Whitespace
  } = require('./tokens');

  function singleOrList(list) {
    return list.length === 1 ? list[0] : list;
  }
}

start = (VariableAssignment / WordToken / Whitespace)*

VariableValue = value:(NotWhitespace / Whitespace)* { return singleOrList(value) }

WordToken = VerbatimString / QuotedString / Word / Variable

VariableAssignment = name:VarName "=" value:WordToken+ {
    return new VariableAssignment(name, singleOrList(value));
  }

Variable
  = "${" name:VarName fallbackType:(":-" / ":=") fallback:Fallback "}" {
    return new Variable(name, fallbackType, fallback);
  }
  / "${" name:VarName "}" { return new Variable(name); }
  / "$" name:VarName { return new Variable(name); }
  / "$" { return new VerbatimString("$"); }

Fallback
  = tokens:(VerbatimString / QuotedString / WordInBrace / Variable / Whitespace)* {
    return singleOrList(tokens);
  }

VarName "variable name"
  = [a-zA-Z_][a-zA-Z_0-9]* { return text(); }

Whitespace = [ \t\n\r]+ { return new Whitespace(text()); }
NotWhitespace = [^ \t\n\r]+ { return new Word(text()); }

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
BraceStringChar  = Escaped / !([$}'"] / Whitespace) char:. { return char; }
BareStringChar   = Escaped / !([$'"] / Whitespace) char:. { return char; }

Escaped
  = '\\\n' { return ""; }
  / "\\" escaped:. { return escaped; }