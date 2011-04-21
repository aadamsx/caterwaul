// Global management.
// Caterwaul creates a global symbol, caterwaul. Like jQuery, there's a mechanism to get the original one back if you don't want to replace it. You can call caterwaul.deglobalize() to return
// caterwaul and restore the global that was there when Caterwaul was loaded (might be useful in the unlikely event that someone else named their library Caterwaul). Note that deglobalize() is
// available only on the global caterwaul() function. It wouldn't make much sense for clones to inherit it.

// There's an interesting case that comes up when loading a global caterwaul. If we detect that the caterwaul we just loaded has the same version as the one that's already there, we revert back
// to the original. This is very important for precompilation and the reason for it is subtle. Precompilation relies on tracing to determine the compiled form of each function handed to
// caterwaul, so if that caterwaul is replaced for any reason then the traces won't happen. A very common setup is something like this:

// | <script src='caterwaul.js'></script>
//   <script src='some-caterwaul-extension.js'></script>
//   <script src='my-script.js'></script>

// Often you'll want to precompile the whole bundle, since caterwaul.js includes behaviors that aren't necessarily precompiled. To do this, it's tempting to precompile the whole bundle of
// caterwaul, the extensions, and your code. Without version checking, however, the traces would be lost and nothing would happen.

  var original_global  = typeof caterwaul === 'undefined' ? undefined : caterwaul,
      caterwaul_global = caterwaul = se(configurable(), function () {this.deglobalize = function () {caterwaul = original_global; return this}});

//   Uniqueness and identification.
//   Caterwaul has a number of features that require it to be able to identify caterwaul functions and easily distinguish between them. These methods provide a way to do that. Also, I'm using
//   this section as an excuse to stash some useful utility methods onto caterwaul.

//   Finally, the 'caterwaul' property of any caterwaul function will refer to the caterwaul function. This makes the node.js API more systematic.

  caterwaul_global.method('global', function () {return caterwaul_global}).self_reference('caterwaul').
                    field('is_caterwaul', is_caterwaul).field('initializer', initializer).field('unique', unique).field('gensym', gensym).field('genint', genint).once('id', gensym).

                   method('toString', function () {return '[caterwaul instance ' + this.id() + ']'}).field('merge', merge).
                   method('check_version', function () {if (original_global && this.version === original_global.version) this.deglobalize(); return this}).

                   method('reinitialize', function (transform, erase_configurations) {var c = (transform || id)(this.initializer), result = c(c, this.unique).deglobalize();
                                                                                      erase_configurations || (result.configurations = this.configurations); return result}).

//   Magic.
//   Sometimes you need to grab a unique value that is unlikely to exist elsewhere. Caterwaul gives you such a value given a string. These values are shared across all Caterwaul instances and are
//   considered to be opaque. Because of the possibility of namespace collisions, you should name your magic after a configuration or otherwise prefix it somehow.

                   method('magic', (function (table) {return function (name) {return table[name] || (table[name] = {})}}));
// Generated by SDoc 
