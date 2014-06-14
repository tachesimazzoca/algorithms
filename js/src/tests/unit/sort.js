(function() {
  module("algorithms-js sort");

  function testSortNumbers(sorter) {
    var cmp = function(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    };
    var items = [4, 3, 1, 2];
    sorter.sort(items, cmp);
    deepEqual(items, [1, 2, 3, 4]);
  }

  test("Selection", function() {
    testSortNumbers(new algsJS.sort.Selection());
  });

  test("Insertion", function() {
    testSortNumbers(new algsJS.sort.Insertion());
  });
})();
