(function() {
  var root = this;
  var previousAlgsJS = root.algsJS;
  var algsJS = root.algsJS = {};

  algsJS.VERSION = "0.0.0";

  algsJS.noConflict = function() {
    root.algsJS = previousAlgsJS;
    return this;
  };
}).call(this);
