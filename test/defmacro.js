// Caterwaul defmacro standard library tests

test(function () {
  var c = caterwaul.clone('qs', 'qg', 'fn', 'defmacro');

  c(function (eq) {
    eq(defmacro[foo][fn_[qs[bar]]], null);
    var bar = 6;
    eq(foo, 6);
    var x = 3;
    eq(x + 5, 8, 'first');

    eq(defmacro[_ + _][fn[l, r][qs[_ * _].s('_', [l, r])]], null);
    eq(x + 5, 15, 'second');

    defmacro[loop[_].over[_]][fn[expr, xs][(with_gensyms[i, l, xs][qg[function () {
      for (var i = 0, xs = _, l = xs.length, it; it = xs[i], i < l; ++i) {_}}]()]).s('_', [xs, expr])]];
    var count = 0;
    loop[eq(it, ++count)].over[[1, 2, 3, 4, 5]];
    eq(count, 5);
  }) (eq);
});

// Generated by SDoc 