/**
 * @module algorithms-js
 */
(function() {
  var st = algsJS.st = {};

  var Events = algsJS.Events;

  var hashCode = function(k) {
    if (typeof(k) === 'number') {
      return k;
    }
    if (typeof(k) === 'object') {
      if (typeof(k.hashCode) === 'function') {
        return k.hashCode();
      }
    }
    var h = 0;
    var str = toString.call(k);
    var len = str.length;
    for (var i = 0; i < len; i++) {
        h = (31 * h + str.charCodeAt(i)) & 0xFFFF;
    }
    return h;
  };

  /**
   * @class st.HashMap
   */
  var HashMap = st.HashMap = function() {
    this.table = {};
  };

  HashMap.prototype = {
    /**
     * @method get
     * @param {Object} key The key
     * @return {Object} The value
     */
    get: function(k) {
      var h = hashCode(k);
      if (!this.table[h]) {
        return undefined;
      }
      for (var i in this.table[h]) {
        if (_.isEqual(this.table[h][i].key, k)) {
          return this.table[h][i].value;
        }
      }
      return undefined;
    }

    /**
     * @method put 
     * @param {Object} key A key
     * @param {Object} value A value
     */
  , put: function(k, v) {
      var h = hashCode(k);
      this.table[h] = this.table[h] || [];
      var updated = false;
      for (var i in this.table[h]) {
        if (_.isEqual(this.table[h][i].key, k)) {
          updated = true;
          this.table[h][i] = { key: k, value: v };
        }
      }
      if (!updated) this.table[h].push({ key: k, value: v });
    }

    /**
     * @method entrySet
     * @return {Array} An array of key-value object 
     */
  , entrySet: function() {
      var entries = [];
      for (var h in this.table) {
        for (var i in this.table[h]) {
          entries.push(_.clone(this.table[h][i]));
        }
      }
      return entries;
    }
  };
  _.extend(HashMap.prototype, Events);
})();
