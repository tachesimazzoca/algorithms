(function() {
  module("algorithms-js uf");

  test("QuickFind", function() {
    var uf = new algsJS.uf.QuickFind(5);
    deepEqual(uf.idx, [0, 1, 2, 3, 4]);

    uf.union(0, 1);
    ok(uf.connected(0, 1));
    deepEqual(uf.idx, [1, 1, 2, 3, 4]);

    uf.union(3, 4);
    ok(uf.connected(3, 4));
    deepEqual(uf.idx, [1, 1, 2, 4, 4]);

    uf.union(2, 3);
    ok(uf.connected(2, 3));
    ok(uf.connected(3, 4));
    ok(uf.connected(4, 2));
    deepEqual(uf.idx, [1, 1, 4, 4, 4]);
  });

  test("QuickUnion", function() {
    var uf = new algsJS.uf.QuickUnion(5);
    deepEqual(uf.idx, [0, 1, 2, 3, 4]);

    uf.union(1, 3);
    ok(uf.connected(1, 3));
    deepEqual(uf.idx, [0, 3, 2, 3, 4]);

    uf.union(3, 4);
    ok(uf.connected(3, 4));
    ok(uf.connected(4, 1));
    deepEqual(uf.idx, [0, 3, 2, 4, 4]);
  });

  test("WeightedQuickUnion", function() {
    var uf = new algsJS.uf.WeightedQuickUnion(10);
    deepEqual(uf.idx, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    uf.union(2, 5);
    ok(uf.connected(2, 5));
    deepEqual(uf.idx, [0, 1, 2, 3, 4, 2, 6, 7, 8, 9]);
    deepEqual(uf.sz, [1, 1, 2, 1, 1, 1, 1, 1, 1, 1]);

    uf.union(5, 3);
    ok(uf.connected(5, 3));
    deepEqual(uf.idx, [0, 1, 2, 2, 4, 2, 6, 7, 8, 9]);
    deepEqual(uf.sz, [1, 1, 3, 1, 1, 1, 1, 1, 1, 1]);

    uf.union(1, 5);
    ok(uf.connected(1, 5));
    deepEqual(uf.idx, [0, 2, 2, 2, 4, 2, 6, 7, 8, 9]);
    deepEqual(uf.sz, [1, 1, 4, 1, 1, 1, 1, 1, 1, 1]);
  });
})();
