// Precompilation support.
// This makes caterwaul precompilation-aware ahead of time. I'm doing this so that you can precompile caterwaul itself, which used to be responsible for a fair amount of loading time.

  caterwaul_global.precompiled_internal_table = {};
  caterwaul_global.precompiled_internal       = function (f) {var k = gensym(); return this.precompiled_internal_table[k] = f, k};
  caterwaul_global.is_precompiled             = function (f) {return f.constructor === String && this.precompiled_internal_table[f]};
// Generated by SDoc 
