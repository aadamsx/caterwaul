// Environment-dependent compilation.
// It's possible to bind variables from 'here' (i.e. this runtime environment) inside a compiled function. The way we do it is to create a closure using a gensym. (Another reason that gensyms
// must really be unique.) Here's the idea. We use the Function constructor to create an outer function, bind a bunch of variables directly within that scope, and return the function we're
// compiling. The variables correspond to gensyms placed in the code, so the code will have closure over those variables.

// An optional second parameter 'environment' can contain a hash of variable->value bindings. These will be defined as locals within the compiled function.

// New in caterwaul 0.6.5 is the ability to specify a 'this' binding to set the context of the expression being evaluated.

// Caterwaul 1.0 and later automatically bind a variable called 'undefined' that is set to Javascript's 'undefined' value. This is done to defend against pathological cases of 'undefined' being
// set to something else. If you really wnat some other value of undefined, you can always bind it as an environment variable.

  (function () {var bound_expression_template = caterwaul_global.parse('var _bindings; return(_expression)'),
                    binding_template          = caterwaul_global.parse('_variable = _base._variable'),
                    undefined_binding         = caterwaul_global.parse('undefined = void(0)');

//   Compilation options.
//   Gensym renaming will break some things that expect the compiled code to be source-identical to the original tree. As a result, I'm introducing an options hash that lets you tell the compiler
//   things like "don't rename the gensyms this time around". Right now gensym_renaming is the only option, and it defaults to true.

    caterwaul_global.compile = function (tree, environment, options) {
      options = merge({gensym_renaming: true}, options);

      var bindings = merge({}, this._environment || {}, environment || {}, tree.bindings()), variables = [undefined_binding], s = gensym('base');
      for (var k in bindings) if (own.call(bindings, k) && k !== 'this') variables.push(binding_template.replace({_variable: k, _base: s}));

      var variable_definitions = new this.syntax(',', variables).unflatten(),
          function_body        = bound_expression_template.replace({_bindings: variable_definitions, _expression: tree});

      if (options.gensym_renaming) {var renaming_table = this.gensym_rename_table(function_body);
                                    for (var k in bindings) own.call(bindings, k) && (bindings[renaming_table[k] || k] = bindings[k]);
                                    function_body = function_body.replace(renaming_table);
                                    s             = renaming_table[s]}

      try       {return (new Function(s, function_body)).call(bindings['this'], bindings)}
      catch (e) {throw new Error(e + ' while compiling ' + function_body)}};

//   Gensym erasure.
//   Gensyms are horrible. They look like gensym_foo_1_5fz3ubq_10cbjq3C, which both takes up a lot of space and is hard to read. Fortunately, we can convert them at compile-time. This is possible
//   because Javascript (mostly) supports alpha-conversion for functions.

//   I said "mostly" because some symbols are converted into runtime strings; these are property keys. In the unlikely event that you've got a gensym being used to dereference something, e.g.
//   foo.gensym, then renaming is no longer safe. This, as far as I know, is the only situation where renaming won't work as intended. Because I can't imagine a situation where this would
//   actually arise, I'm not handling this case yet. (Though let me know if I need to fix this.)

//   New gensym names are chosen by choosing the smallest nonnegative integer N such that the gensym's name plus N.toString(36) doesn't occur as an identifier anywhere in the code. (The most
//   elegant option is to use scope analysis to keep N low, but I'm too lazy to implement it.)

    caterwaul_global.gensym_rename_table = function (tree) {
      var names = {}, gensyms = [], gensym_pattern = /^gensym_(.*)_\d+_[^_]+_[^_]+$/;
      tree.reach(function (node) {var d = node.data; gensym_pattern.test(d) && (names[d] || gensyms.push(d)); names[d] = d.replace(gensym_pattern, '$1') || 'anon'});

      var unseen_count = {}, next_unseen = function (name) {if (! (name in names)) return name;
                                                            var n = unseen_count[name] || 0; while (names[name + (++n).toString(36)]); return name + (unseen_count[name] = n).toString(36)};

      for (var renamed = {}, i = 0, l = gensyms.length, g; i < l; ++i) renamed[g = gensyms[i]] || (names[renamed[g] = next_unseen(names[g])] = true);
      return renamed}})();
// Generated by SDoc 
