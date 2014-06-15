(function() {
  var sort = algsJS.sort = {};

  var Util = algsJS.Util;
  var Events = algsJS.Events;

  // Utility functions
  var exchange = function(a, i, j) {
    var v = a[j];
    a[j] = a[i];
    a[i] = v;
  };

  /**
   * @class Selection
   */
  var Selection = sort.Selection = function() {
  };

  Selection.prototype = {
    sort: function(items, cmp) {
      this.trigger('start', items);
      var N = items.length;
      for (var i = 0; i < N; i++) {
        var min = i;
        for (var j = i; j < N; j++) {
          this.trigger('compare', items, j, min);
          if (cmp(items[j], items[min]) < 0) min = j;
        }
        exchange(items, min, i);
        this.trigger('exchanged', items, min, i);
      }
    }
  };
  Util.extend(Selection.prototype, Events);

  /**
   * @class Insertion
   */
  var Insertion = sort.Insertion = function() {
  };

  Insertion.prototype = {
    sort: function(items, cmp) {
      this.trigger('start', items);
      var N = items.length;
      for (var i = 0; i < N; i++) {
        for (var j = i; j > 0; j--) {
          this.trigger('compare', items, j, j - 1);
          if (cmp(items[j], items[j - 1]) >= 0) break;
          exchange(items, j, j - 1);
          this.trigger('exchanged', items, j, j - 1);
        }
      }
    }
  };
  Util.extend(Insertion.prototype, Events);

  /**
   * @class Shell
   */
  var Shell = sort.Shell = function() {
  };

  Shell.prototype = {
    sort: function(items, cmp) {
      this.trigger('start', items);
      var N = items.length;
      // use Knuth's 3x+1 increments
      var h = 1;
      var maxH = Math.floor(N / 3);
      while (h < maxH) h = 3 * h + 1;

      while (h >= 1) {
        for (var i = h; i < N; i++) {
          for (var j = i; j >= h; j -= h) {
            this.trigger('compare', items, j, j - h);
            if (cmp(items[j], items[j - h]) >= 0) break;
            exchange(items, j, j - h);
          }
        }
        h = Math.floor(h / 3);
      }
    }
  };
  Util.extend(Shell.prototype, Events);

  // Mergesort functions
  var Mergeable = {
    merge: function(items, cmp, lo, mid, hi) {
      var aux = items.slice(lo, hi + 1);
      var loP = lo;
      var hiP = mid + 1;
      for (var i = lo; i <= hi; i++) {
        if (loP > mid) {
          // The left-side aux items are empty. Do nothing.
          //items[i] = aux[hiP - lo];
          hiP++;
        } else if (hiP > hi) {
          // The right-side aux items are empty. Copy all left-side aux items.
          items[i] = aux[loP - lo];
          loP++;
        } else {
          this.trigger('compare', items, hiP - lo, loP - lo);
          if (cmp(aux[hiP - lo], aux[loP - lo]) < 0) {
            // Copy the current right-side aux item. (left > right)
            items[i] = aux[hiP - lo];
            hiP++;
          } else {
            // Copy the current left-side aux item. (left <= right)
            items[i] = aux[loP - lo];
            loP++;
          }
        }
      }
    }
  };

  /**
   * @class TopDownMerge
   */
  var TopDownMerge = sort.TopDownMerge = function() {
  };

  TopDownMerge.prototype = {
    sort: function(items, cmp) {
      this.trigger('start', items);
      var me = this;
      var divide = function(lo, hi) {
        if (lo >= hi) return;
        var mid = lo + Math.floor((hi - lo) / 2);
        divide(lo, mid);
        divide(mid + 1, hi);
        me.merge(items, cmp, lo, mid, hi);
        me.trigger('merged', items, lo, mid, hi);
      };
      divide(0, items.length - 1);
    }
  };
  Util.extend(TopDownMerge.prototype, Events, Mergeable);

  /**
   * @class BottomUpMerge
   */
  var BottomUpMerge = sort.BottomUpMerge = function() {
  };

  BottomUpMerge.prototype = {
    sort: function(items, cmp) {
      this.trigger('start', items);
      var N = items.length;
      for (var n = 1; n < N; n = n + n) {
        for (var i = 0; i < N - n; i += (n + n)) {
          var lo = i;
          var mid = i + n - 1;
          var hi = mid + n;
          if (hi > N - 1) hi = N - 1;
          this.merge(items, cmp, lo, mid, hi);
          this.trigger('merged', items, lo, mid, hi);
        }
      }
    }
  };
  Util.extend(BottomUpMerge.prototype, Events, Mergeable);

  /**
   * @class Quick
   */
  var Quick = sort.Quick = function() {
  };

  Quick.prototype = {
    sort: function(items, cmp) {
      this.trigger('start', items);
      var N = items.length;
      var me = this;
      var partition = function(items, lo, hi) {
        if (lo >= hi) return;
        var loP = lo + 1;
        var hiP = hi;
        while (true) {
          while (cmp(items[loP], items[lo]) <= 0 && loP < hi) {
            me.trigger('compare', items, loP, lo);
            loP++;
          }
          while (cmp(items[hiP], items[lo]) >= 0 && hiP > lo) {
            me.trigger('compare', items, hiP, lo);
            hiP--;
          }
          if (loP >= hiP) break;
          exchange(items, loP, hiP);
          me.trigger('exchanged', items, loP, hiP);
        }
        exchange(items, lo, hiP);
        me.trigger('exchanged', items, lo, hiP);
        partition(items, lo, hiP - 1);
        partition(items, loP, hi);
      };
      partition(items, 0, N - 1);
    }
  };
  Util.extend(Quick.prototype, Events);

  /**
   * @class Quick3way
   */
  var Quick3way = sort.Quick3way = function() {
  };

  Quick3way.prototype = {
    sort: function(items, cmp) {
      this.trigger('start', items);
      var N = items.length;
      var me = this;
      var partition = function(items, lo, hi) {
        if (lo >= hi) return;
        var midP = lo;
        var loP = lo + 1;
        var hiP = hi;
        while (loP <= hiP) {
          me.trigger('compare', items, loP, midP);
          var cp = cmp(items[loP], items[midP]);
          if (cp > 0) {
            exchange(items, loP, hiP);
            me.trigger('exchanged', items, loP, hiP);
            hiP--;
          } else if (cp < 0) {
            exchange(items, loP, midP);
            me.trigger('exchanged', items, loP, midP);
            loP++;
            midP++;
          } else {
            loP++;
          }
        }
        partition(items, lo, midP - 1);
        partition(items, loP, hi);
      };
      partition(items, 0, N - 1);
    }
  };
  Util.extend(Quick3way.prototype, Events);
})();
