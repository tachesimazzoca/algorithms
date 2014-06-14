(function() {
  var sort = algsJS.sort = {};

  var log = function(items) {
    // concat to create a copy of the items
    console.log(items.concat());
  };

  /**
   * @class Selection
   */
  var Selection = sort.Selection = function() {
    this.onStart = log;
    this.onSort  = log;
  };

  Selection.prototype = {
    sort: function(items, cmp) {
      this.onStart(items);
      var N = items.length;
      for (var i = 0; i < N; i++) {
        var min = i;
        for (var j = i; j < N; j++) {
          if (cmp(items[j], items[min]) < 0) {
            min = j;
          }
        }
        var v = items[min];
        items[min] = items[i];
        items[i] = v;
        this.onSort(items);
      }
    }
  };

  /**
   * @class Insertion
   */
  var Insertion = sort.Insertion = function() {
    this.onStart = log;
    this.onSort  = log;
  };

  Insertion.prototype = {
    sort: function(items, cmp) {
      this.onStart(items);
      var N = items.length;
      for (var i = 0; i < N; i++) {
        var min = i;
        for (var j = i; j > 0; j--) {
          if (cmp(items[j], items[j - 1]) >= 0) {
            break;
          }
          var v = items[j];
          items[j] = items[j - 1];
          items[j - 1] = v;
          this.onSort(items);
        }
      }
    }
  };
})();
