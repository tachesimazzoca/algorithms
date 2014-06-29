(function() {
  module("algorithms-js sort");

  var debug = function() {
    console.log(Array.prototype.slice.call(arguments, 0));
  };

  function testSorter(sorter) {
    testSameNumbers(sorter);
    testBinaryNumbers(sorter);
    testTernaryNumbers(sorter);
    testOrderedNumbers(sorter);
    testRandomNumbers(sorter);
  }

  function testSameNumbers(sorter) {
    var items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    sorter.sort(items);
    deepEqual(items, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  }

  function testBinaryNumbers(sorter) {
    var items = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
    sorter.sort(items);
    deepEqual(items, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]);
  }

  function testTernaryNumbers(sorter) {
    var items = [1, 2, 0, 0, 1, 0, 1, 1, 2, 0, 1, 2, 1, 1, 0, 1];
    sorter.sort(items);
    deepEqual(items, [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2]);
  }

  function testOrderedNumbers(sorter) {
    var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    sorter.sort(items);
    deepEqual(items, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  }

  function testRandomNumbers(sorter) {
    var items = [];
    var i;
    for (i = 0; i < 16; i++) {
      items[i] = Math.floor(Math.random() * 16);
    }
    sorter.sort(items);

    var sorted = true;
    for (i = 0; i < items.length - 1; i++) {
      if (items[i] > items[i + 1]) {
        sorted = false; break;
      }
    }
    ok(sorted);
  }

  test("Selection", function() {
    var sorter = new algsJS.sort.Selection();
    testSorter(sorter);
  });

  test("Insertion", function() {
    var sorter = new algsJS.sort.Insertion();
    testSorter(sorter);
  });

  test("Shell", function() {
    var sorter = new algsJS.sort.Shell();
    testSorter(sorter);
  });

  test("TopDownMerge", function() {
    var sorter = new algsJS.sort.TopDownMerge();
    testSorter(sorter);
  });

  test("BottomUpMerge", function() {
    var sorter = new algsJS.sort.BottomUpMerge();
    testSorter(sorter);
  });

  test("Quick", function() {
    var sorter = new algsJS.sort.Quick();
    testSorter(sorter);
  });

  test("Quick3way", function() {
    var sorter = new algsJS.sort.Quick3way();
    testSorter(sorter);
  });

  test("Heap", function() {
    var sorter = new algsJS.sort.Heap();
    testSorter(sorter);
  });

  test("PriorityQueue#enqueue", function() {
    var pq = new algsJS.sort.PriorityQueue();
    for (var i = 0; i < 7; i++) {
      pq.enqueue(i);
    }
    deepEqual(pq.heap, [6, 3, 5, 0, 2, 1, 4]);
  });

  test("PriorityQueue#dequeue", function() {
    var pq = new algsJS.sort.PriorityQueue();
    for (var i = 0; i < 7; i++) {
      pq.enqueue(i);
    }
    deepEqual(pq.heap, [6, 3, 5, 0, 2, 1, 4]);
    deepEqual(pq.dequeue(), 6);
    deepEqual(pq.heap, [5, 3, 4, 0, 2, 1]);
    deepEqual(pq.dequeue(), 5);
    deepEqual(pq.heap, [4, 3, 1, 0, 2]);
    deepEqual(pq.dequeue(), 4);
    deepEqual(pq.heap, [3, 2, 1, 0]);
    deepEqual(pq.dequeue(), 3);
    deepEqual(pq.heap, [2, 0, 1]);
    deepEqual(pq.dequeue(), 2);
    deepEqual(pq.heap, [1, 0]);
    deepEqual(pq.dequeue(), 1);
    deepEqual(pq.heap, [0]);
    deepEqual(pq.dequeue(), 0);
    deepEqual(pq.heap, []);
    deepEqual(pq.dequeue(), undefined);
  });
})();
