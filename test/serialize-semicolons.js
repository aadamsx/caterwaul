// Semicolon serialization test.

test('serialize-semicolons', function () {
  eq(new caterwaul.syntax(';').inspect(), '(;)');
  eq(new caterwaul.syntax(';').serialize(), ';');
});

// Generated by SDoc 
