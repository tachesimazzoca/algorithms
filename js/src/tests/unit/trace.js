(function() {
  module("algorithms-js trace");

  test("Tracer#next", function() {
    var logs = [];
    var tracer = new algsJS.trace.Tracer([2, 1, 3], function(o) { logs.push(o); });
    tracer.trace();
    deepEqual(logs, [2]);
    tracer.trace();
    deepEqual(logs, [2, 1]);
    tracer.trace();
    deepEqual(logs, [2, 1, 3]);
    tracer.trace();
    deepEqual(logs, [2, 1, 3, 2]);
    tracer.reset();
    tracer.trace();
    deepEqual(logs, [2, 1, 3, 2, 2]);
  });
})();
