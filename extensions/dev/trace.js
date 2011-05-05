// Code trace behavior | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// The 'tracer' function constructs a caterwaul compiler that invokes hooks before and after each expression. You can inspect the value after it is computed and can measure how long it takes to
// return (or whether it fails to return due to an exception being thrown). For example, here's a very simple profiler (it doesn't account for 'own time', just 'total time'):

// | var trace   = caterwaul.tracer(function (expression)        {timings[expression.id()] = timings[expression.id()] || 0; timers.push(+new Date())},
//                                  function (expression, value) {timings[expression.id()] += +new Date() - timers.pop()});
//   var timings  = {};
//   var timers   = [];
//   var profiler = caterwaul(function (code) {    // This caterwaul creation is unnecessary since it isn't doing anything else, but generally you'll have one
//     return trace(code);
//   });
//   var profiled = profiler(function () {...});   // Annotations inserted during macroexpansion
//   profiled();                                   // This run is measured

// Interface details.
// Tracing things involves modifying the generated expressions in a specific way. First, the tracer marks that an expression will be evaluated. This is done by invoking a 'start' function, which
// then alerts the before-evaluation listener. Then the tracer evaluates the original expression, capturing its output and alerting the listener in the process. Listeners are free to use and/or
// modify this value, but doing so may change how the program runs. (Note that value types are immutable, so in this case no modification will be possible.)

// There is currently no way to catch errors generated by the code. This requires a more aggressive and much slower method of tracing, and most external Javascript debuggers can give you a
// reasonable stack trace. (You can also deduce the error location by observing the discrepancy between before and after events.)

// Here is the basic transformation applied to each expression in the code (where qs[] indicates a reference to the syntax tree):

// | some_expression   ->  (before_hook(qs[some_expression]), after_hook(qs[some_expression], some_expression))

// Note that when you're building up a caterwaul function you'll probably want to trace the code last. For example, these two definitions are very different:

// | // Fails:                                     // Succeeds:
//   caterwaul(function (code) {                   caterwaul(function (code) {
//     var c1 = trace(code);                         var c1 = this.macroexpand(code, macros);
//     return this.macroexpand(c1, macros);          return trace(c1);
//   });                                           });

// The reason is that traced code isn't much like the code going in due to the way the transformation works. Another side-effect of tracing is that some of the functions you're tracing will have
// transformed source code. For example, suppose you're tracing this:

// | xs.map(function (x) {return x + 1});

// The sequence of values will include the trace-annotated version of function (x) {return x + 1}, and this function will be seriously gnarly. I've thought of ways to try to fix this, but I
// haven't come up with any good ones yet. If anyone finds one let me know.

// The hard part.
// If Javascript were any kind of sane language this module would be trivial to implement. Unfortunately, however, it is fairly challenging, primarily because of two factors. One is the role of
// statement-mode constructs, which can't be wrapped directly inside function calls. The other is method invocation binding, which requires either (1) no record of the value of the method itself,
// or (2) caching of the object. In this case I've written a special function to handle the caching to reduce the complexity of the generated code.

caterwaul.js_base()(function ($) {
  $.tracer(before, after) = $.clone().macros(expression_macros, statement_macros, hook_macros)
                            -effect [it.init_function(tree) = this.macroexpand(anon('S[_x]').replace({_x: tree}))]

//   Expression-mode transformations.
//   Assuming that we're in expression context, here are the transforms that apply. Notationally, H[] means 'hook this', D[] means 'hook this direct method call', I[] means 'hook this indirect
//   method call', E[] means 'trace this expression recursively', and S[] means 'trace this statement recursively'. It's essentially a simple context-free grammar over tree expressions.

  -where [anon              = $.anonymizer('E', 'S', 'H', 'D', 'I'),
          rule(p, e)        = $.macro(anon(p), e.constructor === Function ? given.match in this.expand(e.call(this, match)) : anon(e)),

          expression_macros = [rule('E[_x]', 'H[_, _x]'),                                                             // Base case: identifier, literal, or empty function
                               rule('E[]',   'null'),                                                                 // Base case: oops, descended into nullary something

                               assignment_operator(it) -over- qw('= += -= *= /= %= &= |= ^= <<= >>= >>>='),
                               binary_operator(it)     -over- qw('() [] + - * / % < > <= >= == != === !== in instanceof ^ & | && ||'),
                               unary_operator(it)      -over- qw('+ - ! ~'),

                               rule('E[(_x)]', '(E[_x])'),                                                            // Destructuring of parens
                               rule('E[++_x]', 'H[_, ++_x]'), rule('E[--_x]', 'H[_, --_x]'),                          // Increment/decrement (can't trace original value)
                               rule('E[_x++]', 'H[_, _x++]'), rule('E[_x--]', 'H[_, _x--]'),

                               rule('E[_x, _y]',                 'E[_x], E[_y]'),                                     // Preserve commas -- works in an argument list
                               rule('E[_x._y]',                  'H[_, E[_x]._y]'),                                   // No tracing for constant attributes
                               rule('E[_f()]',                   'H[_, E[_f]()]'),                                    // Nullary function call won't be handled by binary ()

                               rule('E[_o._m(_xs)]',             'D[_, E[_o], _m, [E[_xs]]]'),                        // Use D[] to indicate direct method binding
                               rule('E[_o[_m](_xs)]',            'I[_, E[_o], E[_m], [E[_xs]]]'),                     // Use I[] to indicate indirect method binding
                               rule('E[_o._m()]',                'D[_, E[_o], _m, []]'),                              // Duplicate for nullary method calls
                               rule('E[_o[_m]()]',               'I[_, E[_o], E[_m], []]'),

                               rule('E[typeof _x]',              'H[_, typeof _x]'),                                  // No tracing for typeof since the value may not exist
                               rule('E[void _x]',                'H[_, void E[_x]]'),                                 // Normal tracing
                               rule('E[delete _x]',              'H[_, delete _x]'),                                  // Lvalue, so no tracing for the original
                               rule('E[delete _x._y]',           'H[_, delete E[_x]._y]'),
                               rule('E[delete _x[_y]]',          'H[_, delete E[_x][E[_y]]]'),
                               rule('E[new _x(_y)]',             'H[_, new H[_x](E[_y])]'),                           // Hook the constructor to prevent method-handling from happening
                               rule('E[{_ps}]',                  'H[_, {E[_ps]}]'),                                   // Hook the final object and distribute across k/v pairs (more)
                               rule('E[_k: _v]',                 '_k: E[_v]'),                                        // Ignore keys (which are constant)
                               rule('E[[_xs]]',                  'H[_, [E[_xs]]]'),                                   // Hook the final array and distribute across elements
                               rule('E[_x ? _y : _z]',           'H[_, E[_x] ? E[_y] : E[_z]]'),
                               rule('E[function (_xs) {_body}]', 'H[_, function (_xs) {S[_body]}]'),                  // Trace body in statement mode rather than expression mode
                               rule('E[function ()    {_body}]', 'H[_, function ()    {S[_body]}]')]                  // Handle nullary case

                       -where [assignment_operator(op) = [rule('E[_x     = _y]', 'H[_, _x           = E[_y]]'),
                                                          rule('E[_x[_y] = _z]', 'H[_, E[_x][E[_y]] = E[_z]]'),
                                                          rule('E[_x._y  = _z]', 'H[_, E[_x]._y     = E[_z]]')] -where [t(x)       = anon(x).replace({'=': op}),
                                                                                                                        rule(x, y) = $.macro(t(x), t(y))],

                               binary_operator(op)     = $.macro(anon('E[_x + _y]').replace({'+': op}),    anon('H[_, E[_x] + E[_y]]').replace({'+': op})),
                               unary_operator(op)      = $.macro(anon('E[+_x]').replace({'u+': 'u#{op}'}), anon('H[_, +E[_x]]').replace({'u+': 'u#{op}'})),

                               qw(s)                   = s.split(/\s+/)],

//   Statement-mode transformations.
//   A lot of the time this will drop back into expression mode. However, there are a few cases where we need disambiguation. One is the var statement, where we can't hook the result of the
//   assignment. Another is the {} construct, which can be either a block or an object literal.

//   There's some interesting stuff going on with = and commas. The reason is that sometimes you have var definitions, and they contain = and , trees that can't be traced quite the same way that
//   they are in expressions. For example consider this:

//   | var x = 5, y = 6;

//   In this case we can't evaluate 'x = 5, y = 6' in expression context; if we did, it would produce H[x = H[5]], H[y = H[6]], and this is not valid Javascript within a var statement. Instead,
//   we have to produce x = H[5], y = H[6]. The statement-mode comma and equals rules do exactly that. Note that we don't lose anything by doing this because in statement context the result of an
//   assignment is never used anyway.

          statement_macros = [rule('S[_x]',              'E[_x]'),              rule('S[for (_x) _y]',                           'for (S[_x]) S[_y]'),
                              rule('S[{_x}]',            '{S[_x]}'),            rule('S[for (_x; _y; _z) _body]',                'for (S[_x]; E[_y]; E[_z]) S[_body]'),
                              rule('S[_x; _y]',          'S[_x]; S[_y]'),       rule('S[while (_x) _y]',                         'while (E[_x]) S[_y]'),
                                                                                rule('S[do _x; while (_y)]',                     'do S[_x]; while (E[_y])'),
                              rule('S[_x, _y]',          'S[_x], S[_y]'),       rule('S[do {_x} while (_y)]',                    'do {S[_x]} while (E[_y])'),
                              rule('S[_x = _y]',         '_x = E[_y]'),
                              rule('S[var _xs]',         'var S[_xs]'),         rule('S[try {_x} catch (_e) {_y}]',              'try {S[_x]} catch (_e) {S[_y]}'),
                              rule('S[const _xs]',       'const S[_xs]'),       rule('S[try {_x} catch (_e) {_y} finally {_z}]', 'try {S[_x]} catch (_e) {S[_y]} finally {S[_z]}'),
                                                                                rule('S[try {_x} finally {_y}]',                 'try {S[_x]} finally {S[_y]}'),
                              rule('S[return _x]',       'return E[_x]'),       rule('S[function _f(_args) {_body}]',            'function _f(_args) {S[_body]}'),
                              rule('S[return]',          'return'),             rule('S[function _f()      {_body}]',            'function _f()      {S[_body]}'),
                              rule('S[throw _x]',        'throw E[_x]'),
                              rule('S[break _label]',    'break _label'),       rule('S[if (_x) _y]',                            'if (E[_x]) S[_y]'),
                              rule('S[break]',           'break'),              rule('S[if (_x) _y; else _z]',                   'if (E[_x]) S[_y]; else S[_z]'),
                              rule('S[continue _label]', 'continue _label'),    rule('S[if (_x) {_y} else _z]',                  'if (E[_x]) {S[_y]} else S[_z]'),
                              rule('S[continue]',        'continue'),           rule('S[switch (_c) {_body}]',                   'switch (E[_c]) {S[_body]}'),
                              rule('S[_label: _stuff]',  '_label: S[_stuff]'),  rule('S[with (_x) _y]',                          'with (E[_x]) S[_y]')],

//   Hook generation.
//   Most of the actual hook generation code is fairly routine for JIT stuff. The patterns here don't actually expand into other state marker patterns; H, D, and I are all terminal. The [1]
//   subscript is a hack. We want to grab the un-annotated tree, but all of the patterns have state markers on them. So we subscript by [1] to get the child of that state annotation.

          hook_macros      = [rule('H[_tree, _x]',                              expression_hook     (match._tree[1], match._x) -given.match),
                              rule('D[_tree, _object, _method, [_parameters]]', direct_method_hook  (match._tree[1], match)    -given.match),
                              rule('I[_tree, _object, _method, [_parameters]]', indirect_method_hook(match._tree[1], match)    -given.match)]

                      -where [before_hook(tree)                                   = before(tree)       /when.before,
                              after_hook(tree, value)                             = after(tree, value) /when.after -returning- value,
                              after_method_hook(tree, object, method, parameters) = before_hook(tree[0]) -then- after_hook(tree[0], resolved) -then-
                                                                                    after_hook(tree, resolved.apply(object, parameters)) -where[resolved = object[method]],

                              before_hook_ref                                     = new $.ref(before_hook),
                              after_hook_ref                                      = new $.ref(after_hook),
                              after_method_hook_ref                               = new $.ref(after_method_hook),

                              quote_method_name(s)                                = '"#{method.data.replace(/(")/g, "\\$1")}"',

                              expression_hook_template                            = $.parse('(_before(_tree), _after(_tree, _expression))'),
                              indirect_method_hook_template                       = $.parse('(_before(_tree), _after(_tree, _object, _method, [_parameters]))'),

                              expression_hook(original, tree)                     = expression_hook_template.replace({_before: before_hook_ref, _after: after_hook_ref,
                                                                                                                      _tree: new $.ref(original), _expression: tree.as('(')}),

                              method_hook(tree, object, method, parameters)       = indirect_method_hook_template.replace({_before: before_hook_ref, _after: after_method_hook_ref,
                                                                                                                           _tree: new $.ref(original), _object: object, _method: method,
                                                                                                                           _parameters: parameters}),

                              direct_method_hook(tree, match)                     = method_hook(tree, match._object, quote_method_name(match._method), match._parameters),
                              indirect_method_hook(tree, match)                   = method_hook(tree, match._object, match._method,                    match._parameters)]]})(caterwaul);
// Generated by SDoc 
