/**
 * @module algorithms-js
 */
(function() {
  var sort = algsJS.sort = {};

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
   * @class sort.Selection
   */
  var Selection = sort.Selection = function() {
  };

  Selection.prototype = {
    /**
     * @method sort
     * @param {Array} items An array of items
     * @param {Function} [cmp] A comparator
     */
    sort: function(items, cmp) {
      cmp = cmp || compare;
      var N = items.length;
      var i;
      for (i = 0; i < N; i++) {
        if (i === 0) {
          this.trigger('trace', { items: items, state: { i: i }
              , message: "Set i = 0" });
        } else {
            this.trigger('trace', { items: items, state: { i: i }
                , message: "Increment i" });
        }
        var min = i;
        this.trigger('trace', { items: items, state: { min: min }
            , message: "Set min = i" });
        var j;
        for (j = i + 1; j < N; j++) {
          if (j === i + 1) {
            this.trigger('trace', { items: items, state: { j: j }
                , message: "Set j = i + 1" });
          } else {
            this.trigger('trace', { items: items, state: { j: j }
                , message: "Increment j" });
          }
          this.trigger('trace', { items: items
              , message: "Compare items[j] to items[min]" });
          if (cmp(items[j], items[min]) < 0) {
            min = j;
            this.trigger('trace', { items: items, state: { min: min }
                , message: "If items[j] is less than items[min]," +
                    " then set min = j as a minmun entry" });
          } else {
            this.trigger('trace', { items: items
                , message: "If items[j] is not less than items[min], then do nothing" });
          }
        }
        this.trigger('trace', { items: items
            , message: "Scanned items[i..N]" });
        if (i !== min) {
          this.trigger('trace', { items: items
              , message: "The new minimum entry items[min] was found" });
          exchange(items, min, i);
          this.trigger('trace', { items: items
              , message: "Exchange items[i] with items[min]" });
        }
      }
      this.trigger('trace', { items: items
          , message: "Sorted items[]" });
    }
  };
  _.extend(Selection.prototype, Events);

  /**
   * @class sort.Insertion
   */
  var Insertion = sort.Insertion = function() {
  };

  Insertion.prototype = {
    /**
     * @method sort
     * @param {Array} items An array of items
     * @param {Function} [cmp] A comparator
     */
    sort: function(items, cmp) {
      cmp = cmp || compare;
      var N = items.length;
      var i;
      for (i = 1; i < N; i++) {
        if (i === 1) {
          this.trigger('trace', { items: items, state: { i: i }
              , message: "Set i = 1" });
        } else {
          this.trigger('trace', { items: items, state: { i: i }
              , message: "Increment i" });
        }
        var j;
        for (j = i; j > 0; j--) {
          if (j === i) {
            this.trigger('trace', { items: items, state: { j: j }
                , message: "Set j = i" });
          } else {
            this.trigger('trace', { items: items, state: { j: j }
                , message: "Decrement j" });
          }
          this.trigger('trace', { items: items
              , message: "Compare items[j] to items[j - 1]" });
          if (cmp(items[j], items[j - 1]) >= 0) {
            this.trigger('trace', { items: items
                , message: "If items[j] is not less than items[j - 1]," +
                    " then stop scanning items[0..j]" });
            break;
          }
          this.trigger('trace', { items: items
              , message: "items[j] is less than items[j - 1]"});
          exchange(items, j, j - 1);
          this.trigger('trace', { items: items
              , message: "Exchange items[j - 1] with items[j]" });
        }
        this.trigger('trace', { items: items
            , message: "Scanned items[0..j]" });
      }
      this.trigger('trace', { items: items
          , message: "Sorted items[]" });
    }
  };
  _.extend(Insertion.prototype, Events);

  /**
   * @class sort.Shell
   */
  var Shell = sort.Shell = function() {
  };

  Shell.prototype = {
    /**
     * @method sort
     * @param {Array} items An array of items
     * @param {Function} [cmp] A comparator
     */
    sort: function(items, cmp) {
      cmp = cmp || compare;
      var N = items.length;
      // use Knuth's 3x+1 increments
      var h = 1;
      var maxH = Math.floor(N / 3);
      while (h < maxH) h = 3 * h + 1;
      this.trigger('trace', { items: items, state: { h: h }
          , message: "Using Knuth's 3x+1 increments," +
              " set the initial step h = " + h + "" });

      while (h >= 1) {
        this.trigger('trace', { items: items
            , message: "Begin " + h + "-sort" });
        for (var i = h; i < N; i++) {
          if (i === h) {
            this.trigger('trace', { items: items, state: { i: i }
                , message: "Set i = h" });
          } else {
            this.trigger('trace', { items: items, state: { i: i }
                , message: "Increment i" });
          }
          for (var j = i; j >= h; j -= h) {
            if (j === i) {
              this.trigger('trace', { items: items, state: { j: j }
                  , message: "Set j = i" });
            } else {
              this.trigger('trace', { items: items, state: { j: j }
                  , message: "Decrement j by h" });
            }
            this.trigger('trace', { items: items
                , message: "Compare items[j] to items[j - h]" });
            if (cmp(items[j], items[j - h]) >= 0) {
              this.trigger('trace', { items: items
                  , message: "If items[j] is not less than items[j - h]," +
                      " then stop scanning items[0..j by h]" });
              break;
            }
            this.trigger('trace', { items: items
                , message: "items[j] is less than items[j - h]" });
            exchange(items, j, j - h);
            this.trigger('trace', { items: items
                , message: "Exchanged items[j - h] with items[j]" });
          }
        }
        this.trigger('trace', { items: items, state: { i: undefined, j: undefined }
            , message: "Scanned items[0..N by " + h + "]" });

        if (h > 1) {
          h = Math.floor(h / 3);
          this.trigger('trace', { items: items, state: { h: h }
              , message: "Update h = h / 3" });
        } else {
          break;
        }
      }
      this.trigger('trace', { items: items
          , message: "Sorted items[]" });
    }
  };
  _.extend(Shell.prototype, Events);

  // Mergesort functions
  var Mergeable = {
    merge: function(items, cmp, lo, mid, hi) {
      var aux = items.slice(lo, hi + 1);
      var loP = 0;
      var hiP = (mid + 1) - lo;
      this.trigger('trace', { items: items, aux: aux, state: { loP: loP, hiP: hiP }
          , message: "Copy items[lo..hi] to aux[]" });
      for (var i = lo; i <= hi; i++) {
        if (i === lo) {
          this.trigger('trace', { items: items, aux: aux, state: { i: i }
              , message: "Set i = lo" });
        } else {
          this.trigger('trace', { items: items, aux: aux, state: { i: i }
              , message: "Increment i" });
        }
        if ((loP + lo) > mid) {
          // Every lo-side aux[] entry has been copied. Stop merging.
          //items[i] = aux[hiP - lo];
          //hiP++;
          this.trigger('trace', { items: items, aux: aux
              , message: "Every lo-side aux[] entry has been copied. Stop merging" });
          break;
        } else if ((hiP + lo) > hi) {
          // Every hi-side aux[] entry has been copied. Just copy the
          // remaining lo-side aux[] entries.
          items[i] = aux[loP];
          this.trigger('trace', { items: items, aux: aux
              , message: "If aux[hiP] is empty, then copy aux[loP] to items[i]" });
          loP++;
          this.trigger('trace', { items: items, aux: aux, state: { loP: loP }
              , message: "Increment loP" });
        } else {
          if (cmp(aux[hiP], aux[loP]) < 0) {
            // Copy the current right-side aux item. (left > right)
            items[i] = aux[hiP];
            this.trigger('trace', { items: items, aux: aux
                , message: "If aux[hiP] is less than aux[loP], then copy aux[hiP] to items[i]" });
            hiP++;
            this.trigger('trace', { items: items, aux: aux, state: { hiP: hiP }
                , message: "Increment hiP" });
          } else {
            // Copy the current left-side aux item. (left <= right)
            items[i] = aux[loP];
            this.trigger('trace', { items: items, aux: aux
                , message: "If aux[hiP] is not less than aux[loP]," +
                    " then copy aux[loP] to items[i]" });
            loP++;
            this.trigger('trace', { items: items, aux: aux, state: { loP: loP }
                , message: "Increment loP" });
          }
        }
      }
      this.trigger('trace', { items: items, aux: undefined
          , state: { loP: undefined, hiP: undefined, i: undefined }
          , message: "Merged aux[] into items[]" });
    }
  };

  /**
   * @class sort.TopDownMerge
   */
  var TopDownMerge = sort.TopDownMerge = function() {
  };

  TopDownMerge.prototype = {
    /**
     * @method sort
     * @param {Array} items An array of items
     * @param {Function} [cmp] A comparator
     */
    sort: function(items, cmp) {
      cmp = cmp || compare;
      var me = this;
      var divide = function(lo, hi) {
        if (lo >= hi) return;
        me.trigger('trace', { items: items, state: { lo: lo, mid: undefined, hi: hi }
            , message: "Divide items[lo..hi]" });
        var mid = lo + Math.floor((hi - lo) / 2);
        me.trigger('trace', { items: items, state: { mid: mid }
            , message: "Set mid = " + mid });
        divide(lo, mid);
        divide(mid + 1, hi);
        me.trigger('trace', { items: items, state: { lo: lo, mid: mid, hi: hi }
            , message: "Merge items[lo..mid..hi]" });
        me.merge(items, cmp, lo, mid, hi);
      };
      divide(0, items.length - 1);
      me.trigger('trace', { items: items
          , message: "Sorted items[]" });
    }
  };
  _.extend(TopDownMerge.prototype, Events, Mergeable);

  /**
   * @class sort.BottomUpMerge
   */
  var BottomUpMerge = sort.BottomUpMerge = function() {
  };

  BottomUpMerge.prototype = {
    /**
     * @method sort
     * @param {Array} items An array of items
     * @param {Function} [cmp] A comparator
     */
    sort: function(items, cmp) {
      cmp = cmp || compare;
      var N = items.length;
      for (var n = 1; n < N; n = n + n) {
        for (var i = 0; i < N - n; i += (n + n)) {
          var lo = i;
          var mid = i + n - 1;
          var hi = mid + n;
          if (hi > N - 1) hi = N - 1;
          this.trigger('trace', { items: items, state: { lo: lo, mid: mid, hi: hi }
              , message: "Merge items[lo..mid..hi]" });
          this.merge(items, cmp, lo, mid, hi);
        }
      }
      this.trigger('trace', { items: items
          , message: "Sorted items[]" });
    }
  };
  _.extend(BottomUpMerge.prototype, Events, Mergeable);

  /**
   * @class sort.Quick
   */
  var Quick = sort.Quick = function() {
  };

  Quick.prototype = {
    /**
     * @method sort
     * @param {Array} items An array of items
     * @param {Function} [cmp] A comparator
     */
    sort: function(items, cmp) {
      cmp = cmp || compare;
      var N = items.length;
      var me = this;
      var partition = function(items, lo, hi) {
        if (lo >= hi) return;
        var gt = lo + 1;
        var lt = hi;
        me.trigger('trace', { items: items, state: { lo: lo, hi: hi, gt: gt, lt: lt }
            , message: "Sort items[lo..hi]. The partitioning item is items[lo]" });
        while (true) {
          // Scan items[gt]
          me.trigger('trace', { items: items
              , message: "Scan for items[gt] that is greater than the partitioning items[lo]" });
          while (cmp(items[gt], items[lo]) <= 0 && gt < hi) {
            gt++;
          }
          me.trigger('trace', { items: items, state: { gt: gt }
              , message: "Found items[gt] > items[lo]" });

          // Scan items[lt]
          me.trigger('trace', { items: items
              , message: "Scan for items[lt] that is less than the partitioning items[lo]" });
          while (cmp(items[lt], items[lo]) >= 0 && lt > lo) {
            lt--;
          }
          me.trigger('trace', { items: items, state: { lt: lt }
              , message: "Found items[lt] < items[lo]" });

          if (gt >= lt) {
            me.trigger('trace', { items: items
                , message: "if the indicies gt >= lt (i.e. every entry has been partitioned)," +
                  " then stop scanning" });
            break;
          }
          exchange(items, gt, lt);
          me.trigger('trace', { items: items
              , message: "Exchange items[gt] with items[lt]" });
        }
        if (lo !== lt) {
            exchange(items, lo, lt);
            me.trigger('trace', { items: items
                , message: "Exchange the partitioning items[lo] with items[lt]" });
        }

        me.trigger('trace', { items: items, state: { lo: lo, hi: hi, gt: gt, lt: lt }
            , message: "Partition items[lo..lt - 1]" });
        partition(items, lo, lt - 1);

        me.trigger('trace', { items: items, state: { lo: lo, hi: hi, gt: gt, lt: lt }
            , message: "Partition items[gt..hi]" });
        partition(items, gt, hi);
      };
      partition(items, 0, N - 1);
      this.trigger('trace', { items: items
          , state: { lo: 0, hi: N - 1, gt: undefined, lt: undefined }
          , message: "Sorted items[]" });
    }
  };
  _.extend(Quick.prototype, Events);

  /**
   * @class sort.Quick3way
   */
  var Quick3way = sort.Quick3way = function() {
  };

  Quick3way.prototype = {
    /**
     * @method sort
     * @param {Array} items An array of items
     * @param {Function} [cmp] A comparator
     */
    sort: function(items, cmp) {
      cmp = cmp || compare;
      var N = items.length;
      var me = this;
      var partition = function(items, lo, hi) {
        if (lo >= hi) return;
        var midP = lo;
        var loP = lo + 1;
        var hiP = hi;
        me.trigger('trace', { items: items
            , state: { lo: lo, hi: hi, midP: midP, loP: loP, hiP: hiP }
            , message: "Sort items[lo..hi]. The partitioning block is items[midP..loP - 1]" });
        while (loP <= hiP) {
          me.trigger('trace', { items: items
              , state: { midP: midP, loP: loP, hiP: hiP }
              , message: "Compare items[loP] to items[midP]" });
          var cp = cmp(items[loP], items[midP]);
          if (cp > 0) {
            exchange(items, loP, hiP);
            me.trigger('trace', { items: items
                , message: "If items[loP] is greater than items[midP]," +
                    " then exchange items[loP] with items[hiP]" });

            hiP--;
            me.trigger('trace', { items: items, state: { hiP: hiP }
                , message: "Decrement hiP" });

          } else if (cp < 0) {
            exchange(items, loP, midP);
            me.trigger('trace', { items: items
                , message: "If items[loP] is less than items[midP]," +
                    " then exchange items[loP] with items[midP]" });
            loP++;
            midP++;
            me.trigger('trace', { items: items, state: { loP: loP, midP: midP }
                , message: "Increment loP and midP" });
          } else {
            loP++;
            me.trigger('trace', { items: items
                , message: "If items[loP] is equal to items[midP]," +
                    " then increment loP" });
          }
        }
        me.trigger('trace', { items: items
            , state: { lo: lo, hi: hi, loP: loP, midP: midP, hiP: hiP }
            , message: "Partition items[lo..midP - 1]" });
        partition(items, lo, midP - 1);

        me.trigger('trace', { items: items
            , state: { lo: lo, hi: hi, loP: loP, midP: midP, hiP: hiP }
            , message: "Partition items[loP..hi]" });
        partition(items, loP, hi);
      };
      partition(items, 0, N - 1);
      this.trigger('trace', { items: items
          , state: { lo: 0, hi: N - 1, midP: undefined, loP: undefined, hiP: undefined }
          , message: "Sorted items[]" });
    }
  };
  _.extend(Quick3way.prototype, Events);

  // Binary heap functions
  var BinaryHeap = {
    sink: function(a, cmp, k, n) {
      var i = k;
      while (true) {
        var j = (i + 1) * 2 - 1;
        if (j >= n) break;
        this.trigger('compare', a, j, j + 1);
        if (j < (n - 1) && cmp(a[j], a[j + 1]) < 0) j++;
        this.trigger('compare', a, i, j);
        if (cmp(a[i], a[j]) >= 0) break;
        exchange(a, i, j);
        this.trigger('exchanged', a, i, j);
        i = j;
      }
    }

  , swim: function(a, cmp, k) {
      var i = k;
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
  };

  /**
   * @class sort.Heap
   */
  var Heap = sort.Heap = function() {
  };

  Heap.prototype = {
    /**
     * @method sort
     * @param {Array} items An array of items
     * @param {Function} [cmp] A comparator
     */
    sort: function(items, cmp) {
      cmp = cmp || compare;
      var k;
      var n = items.length;
      for (k = Math.floor(n / 2) - 1; k >= 0; k--) {
        this.sink(items, cmp, k, n);
      }
      while (n > 0) {
        n--;
        exchange(items, 0, n);
        this.trigger('exchanged', items, 0, n);
        this.sink(items, cmp, 0, n);
      }
    }
  };
  _.extend(Heap.prototype, BinaryHeap, Events);

  /**
   * @class sort.PriorityQueue
   * @constructor
   * @param {Function} [cmp] A comparator
   */
  var PriorityQueue = sort.PriorityQueue = function(cmp) {
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
      this.swim(this.heap, this.comparator, this.heap.length - 1);
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
      this.sink(this.heap, this.comparator, 0, this.heap.length);
      return v;
    }
  };
  _.extend(PriorityQueue.prototype, BinaryHeap, Events);
})();
