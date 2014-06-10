(function() {
  var uf = algsJS.uf = {};

  /**
   * @class QuickFind
   * @constructor
   * @param {Number} N of items
   */
  var QuickFind = uf.QuickFind = function(n) {
    this.idx = [];
    for (var i = 0; i < n; i++) {
      this.idx[i] = i;
    }
  };

  QuickFind.prototype = {
    find: function(p) {
      return this.idx[p];
    }

  , connected: function(p, q) {
      return this.idx[p] === this.idx[q];
    }

  , union: function(p, q) {
      if (!this.connected(p, q)) {
        var i, len;
        var rootIdx = this.idx[p];
        len = this.idx.length;
        for (i = 0;  i < len; i++) {
          if (rootIdx === this.idx[i]) {
            this.idx[i] = this.idx[q];
          }
        }
      }
    }
  };

  /**
   * @class QuickUnion
   * @constructor
   * @param {Number} N of items
   */
  var QuickUnion = uf.QuickUnion = function(n) {
    this.idx = [];
    for (var i = 0; i < n; i++) {
      this.idx[i] = i;
    }
  };

  QuickUnion.prototype = {
    find: function(p) {
      var q = p;
      do {
        p = q;
        q = this.idx[p];
      } while (q !== p);
      return q;
    }

  , connected: function(p, q) {
      return this.find(p) === this.find(q);
    }

  , union: function(p, q) {
      var rootP = this.find(p);
      var rootQ = this.find(q);
      if (rootP !== rootQ) {
        this.idx[rootP] = rootQ;
      }
    }
  };

  /**
   * @class WeightedQuickUnion
   * @constructor
   * @param {Number} N of items
   */
  var WeightedQuickUnion = uf.WeightedQuickUnion = function(n) {
    this.idx = [];
    this.sz = [];
    for (var i = 0; i < n; i++) {
      this.idx[i] = i;
      this.sz[i] = 1;
    }
  };

  WeightedQuickUnion.prototype = {
    find: function(p) {
      var q = p;
      do {
        p = q;
        q = this.idx[p];
      } while (q !== p);
      return q;
    }

  , connected: function(p, q) {
      return this.find(p) === this.find(q);
    }

  , union: function(p, q) {
      var rootP = this.find(p);
      var rootQ = this.find(q);
      if (rootP !== rootQ) {
        if (this.sz[rootP] < this.sz[rootQ]) {
          this.idx[rootP] = rootQ;
          this.sz[rootQ] += this.sz[rootP];
        } else {
          this.idx[rootQ] = rootP;
          this.sz[rootP] += this.sz[rootQ];
        }
      }
    }
  };
})();
