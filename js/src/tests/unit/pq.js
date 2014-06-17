(function() {
  module("algorithms-js pq");

  var debug = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    console.log(args[1].concat());
  };

  var cmpInt = function(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  };

  test("PriorityQueue#enqueue", function() {
    var pq = new algsJS.pq.PriorityQueue(cmpInt);
    for (var i = 0; i < 7; i++) {
      pq.enqueue(i);
    }
    deepEqual(pq.heap, [6, 3, 5, 0, 2, 1, 4]);
  });

  test("PriorityQueue#dequeue", function() {
    var pq = new algsJS.pq.PriorityQueue(cmpInt);
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
