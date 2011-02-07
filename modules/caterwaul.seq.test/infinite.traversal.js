// Take/drop tests.

test('caterwaul.seq.infinite.traversal', function () {
  var c = caterwaul.clone('std seq');
  c(function (eq) {
    var naturals = new caterwaul.seq.infinite.y(fn[x][x + 1], 0);
    var big      = naturals.drop(fn[x][x < 1000]);
    var small    = naturals.take(fn[x][x < 1000]);

    eq(big.h(), 1000);
    eq(big.t().h(), 1001);
    eq(big.t().t().h(), 1002);

    eq(small.length, 1000);
    eq(small[0], 0);
    eq(small[1], 1);
    eq(small[999], 999);
  })(eq);
});

// Generated by SDoc 
