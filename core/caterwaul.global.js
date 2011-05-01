// Configurations.
// Caterwaul prior to version 1.0 relied on an ad-hoc cloning/configuration system tailored for the use of managing multiple customized compiler instances. Version 1.0 changes this a little bit.
// Instead of cloning compilers, we now instantiate the core 'caterwaul' class:

// | var compiler = caterwaul('core');
//   compiler(function () {...});

// The global 'caterwaul' function takes configurations and returns compilers. This breaks the original symmetry that existed between the global caterwaul function and instances of it, but the
// new model is certainly more straightforward from a traditional object-oriented perspective.

  var configurable = module().class_eval(function (def) {
    this.attr_lazy('configurations',        Object).
         attr_lazy('active_configurations', Object);

    def('configuration', function (name, f) {this.configurations()[name] = f; return this});
    def('configure',     function ()        {for (var cs = this.individual_configurations(arguments), i = 0, l = cs.length; i < l; ++i) this.apply_configuration(cs[i]); return this});

    def('individual_configurations', function (xs) {
      for (var result = [], i = 0, l = xs.length, x; i < l; ++i) if ((x = xs[i]) instanceof Array) result.push.apply(result, this.individual_configurations(x));
                                                                 else                              result.push(x);
      return result});

    def('apply_configuration', function (c) {
      if (c.constructor === String) {var active = this.active_configurations();
                                     return active[c] || (active[c] = this.apply_configuration(this.configurations()[c] || fail('nonexistent configuration ' + c)) || this)}
      else return c.call(this), this})});

//   Global management.
//   Caterwaul creates a global symbol, caterwaul. Like jQuery, there's a mechanism to get the original one back if you don't want to replace it. You can call caterwaul.deglobalize() to return
//   caterwaul and restore the global that was there when Caterwaul was loaded (might be useful in the unlikely event that someone else named their library Caterwaul). Note that deglobalize() is
//   available only on the global caterwaul() function.

    var original_global  = typeof caterwaul === 'undefined' ? undefined : caterwaul,
        caterwaul_global = caterwaul = module.extend(calls_init());

//   Static utilities.
//   These are available on the caterwaul global.

    caterwaul_global.instance_eval(function (def) {def('deglobalize', function () {caterwaul = original_global; return caterwaul_global});
                                                   def('module', module); def('gensym', gensym); def('initializer', initializer); def('unique', unique)});

//   Instance methods.
//   These will be available on every caterwaul compiler function.

    caterwaul_global.attr_lazy('id', gensym).class_eval(function (def) {def('toString', function () {return '[caterwaul instance ' + this.id() + ']'})});

//   Version management and reinitialization.
//   There's an interesting case that comes up when loading a global caterwaul. If we detect that the caterwaul we just loaded has the same version as the one that's already there, we revert back
//   to the original. This is very important for precompilation and the reason for it is subtle. Precompilation relies on tracing to determine the compiled form of each function handed to
//   caterwaul, so if that caterwaul is replaced for any reason then the traces won't happen. A very common setup is something like this:

//   | <script src='caterwaul.js'></script>
//     <script src='some-caterwaul-extension.js'></script>
//     <script src='my-script.js'></script>

//   Often you'll want to precompile the whole bundle, since caterwaul.js includes behaviors that aren't necessarily precompiled and you might get better minification. To do this, it's tempting
//   to precompile the whole bundle of caterwaul, the extensions, and your code. Without version checking, however, the traces would be lost and nothing would happen.

    module().attr('version').extend(caterwaul_global);
    caterwaul_global.instance_eval(function (def) {
      def('check_version', function () {if (original_global && this.version() === original_global.version()) this.deglobalize(); return this});
      def('reinitialize',  function (transform, erase_configurations) {var c = (transform || function (x) {return x})(this.initializer), result = c(c, this.unique).deglobalize();
                                                                       erase_configurations || (result.instance_data.configurations = this.configurations()); return result})});

//   Variadic methods.
//   A lot of the time we'll want some kind of variadic behavior for methods. These meta-methods define such behavior. There are a few templates that occur commonly in the caterwaul source, and
//   you can define your own meta-methods to handle other possibilities.

    caterwaul_global.instance_eval(function (def) {
      def('variadic',              function (f) {return function () {for (var i = 0, l = arguments.length;                       i < l; ++i) f.call(this, arguments[i]);    return this}});
      def('right_variadic_binary', function (f) {return function () {for (var i = 0, l = arguments.length - 1, x = arguments[l]; i < l; ++i) f.call(this, arguments[i], x); return this}})});
// Generated by SDoc 
