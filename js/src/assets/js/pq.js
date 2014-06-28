/**
 * @module algorithms-js
 */
(function() {
  var pq = algsJS.pq = {};

  var Util = algsJS.Util;
  var Events = algsJS.Events;

  var exchange = function(a, i, j) {
    var v = a[j];
    a[j] = a[i];
    a[i] = v;
  };

  var compare = function(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  };

  /**
   * @class pq.PriorityQueue
   * @constructor
   * @param {Function} [cmp] A comparator
   */
  var PriorityQueue = pq.PriorityQueue = function(cmp) {
    this.heap = [];
    this.comparator = cmp || compare;
  };

  PriorityQueue.prototype = {
    /**
     * @method enqueue
     * @param {Object} v An item to add
     */
    enqueue: function(v) {
      this.heap.push(v);
      this.trigger('updated', this.heap);
      var i = this.heap.length - 1;
      var a = this.heap;
      var cmp = this.comparator;
      do {
        var j = Math.floor((i + 1) / 2) - 1;
        this.trigger('compare', a, j, i);
        if (cmp(a[j], a[i]) < 0) {
          exchange(a, j, i);
          this.trigger('exchanged', a, j, i);
        }
        i = Math.floor((i + 1) / 2) - 1;
      } while(i > 0);
    }

    /**
     * @method dequeue
     * @return {Object} The maximum item
     */
  , dequeue: function() {
      var N = this.heap.length;
      if (N === 0) {
        return undefined;
      }
      exchange(this.heap, 0, N - 1);
      this.trigger('exchanged', this.heap, 0, N - 1);
      var v = this.heap.pop();
      this.trigger('updated', this.heap);
      var i = 0;
      var a = this.heap;
      var cmp = this.comparator;
      while (true) {
        var j = (i + 1) * 2 - 1;
        if (j >= N) break;
        this.trigger('compare', a, j, j + 1);
        if (j < (N - 1) && cmp(a[j], a[j + 1]) < 0) j++;
        this.trigger('compare', a, i, j);
        if (cmp(a[i], a[j]) >= 0) {
          break;
        }
        exchange(a, i, j);
        this.trigger('exchanged', a, i, j);
        i = j;
      }
      return v;
    }
  };
  Util.extend(PriorityQueue.prototype, Events);
})();
