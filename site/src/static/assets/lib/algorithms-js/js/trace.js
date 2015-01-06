/**
 * @module algorithms-js
 */
(function() {
  var trace = algsJS.trace = {};

  var Tracer = trace.Tracer = function(operations, callback) {
    this.step = 0;
    this.operations = operations || [];
    this.callback = callback || function(o) { console.log(o); };
  };

  Tracer.prototype = {
    trace: function() {
      if (this.operations.length === 0)
        return;
      this.callback(this.operations[this.step]);
      if (this.step >= this.operations.length - 1)
        this.step = 0;
      else
        this.step++;
    }
  , reset: function() {
      this.step = 0;
    }
  };
})();
