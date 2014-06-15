/**
 * @module algorithms-js
 */
(function() {
  var root = this;
  var previousAlgsJS = root.algsJS;
  var algsJS = root.algsJS = {};

  // VERSION
  algsJS.VERSION = "0.0.0";

  // noConflict
  algsJS.noConflict = function() {
    root.algsJS = previousAlgsJS;
    return this;
  };

  /**
   * Provides static utility methods.
   *
   * @class Util
   */
  var Util = algsJS.Util = {};

  /**
   * Extends a given object with all the properties
   *
   * @static
   * @method extend
   * @param {Object} An object that will receive the new properties
   * @param {Object} Additional objects containing properties to merge in
   */
  Util.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < args.length; i++) {
      if (args[i]) {
        for (var prop in args[i]) {
          obj[prop] = args[i][prop];
        }
      }
    }
    return obj;
  };

  /**
   * Functions to set up the prototype chain.
   *
<pre><code>var Animal = function(name) {
  this.name = name;
};
algsJS.Util.extend(Animal, algsJS.Extendable);
var Bird = Animal.extend({
  fly: function() { return "Fly! " + this.name; }
}):
</code></pre>
   *
   * @class Extendable
   */
  algsJS.Extendable = {
    extend: function(protoProps, staticProps) {
      var parent = this;
      var child;

      if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
      } else {
        child = function() { return parent.apply(this, arguments); };
      }

      Util.extend(child, parent, staticProps);

      var Surrogate = function() { this.constructor = child; };
      Surrogate.prototype = parent.prototype;
      child.prototype = new Surrogate();

      if (protoProps) Util.extend(child.prototype, protoProps);

      child.__super__ = parent.prototype;

      return child;
    }
  };
}).call(this);
