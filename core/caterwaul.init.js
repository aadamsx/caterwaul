// Init method.
// This is the main entry point of caterwaul when you use it as a function. As of version 0.6.4, the init() property is polymorphic in semantics as well as structure. There are two cases:

// | 1. You invoke caterwaul on a syntax node. In this case only macroexpansion is performed.
//   2. You invoke caterwaul on anything else. In this case the object is parsed, macroexpanded, and then compiled.

// This pattern is then closed under intent; that is, caterwaul functions compose both in the context of function -> function compilers (though composition here isn't advisable), and in the
// context of tree -> tree compilers (macroexpansion). Having such an arrangement is important for before() and after() to work properly.

// Even though the caterwaul core doesn't support precompilation, I've built in mechanisms here to support it. The reason is that the precompiler will begin referencing the
// internal_precompiled() function possibly before it is loaded, and in that situation the function needs to be ready.

// Somewhat unrelated to the rest of this stuff is the 'create_instance' definition on caterwaul_global. This tells the caterwaul module to create instances that call their own 'init' methods,
// and we add the 'init' method in the class_eval section below.

  caterwaul_global.instance_eval(function (def) {
    def('create_instance', calls_init);

    def('precompiled_internal_table', {});
    def('precompiled_internal', function (f) {var k = gensym(); return this.precompiled_internal_table[k] = f, k});
    def('is_precompiled',       function (f) {return f.constructor === String && this.precompiled_internal_table[f]})});

  caterwaul_global.class_eval(function (def) {
    def('init',                 function (f, environment) {return caterwaul_global.is_precompiled(f) || this.init_not_precompiled(f, environment)});
    def('init_not_precompiled', function (f, environment) {
      var result = f.constructor === caterwaul_global.syntax ? this.apply_before_functions(f) : f;
          result = f.constructor === caterwaul_global.syntax ? this.macroexpand(result) : caterwaul_global.compile(this(caterwaul_global.parse(result)), environment);
            return f.constructor === caterwaul_global.syntax ? this.apply_after_functions(result) : result})});
// Generated by SDoc 
