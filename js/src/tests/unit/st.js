(function() {
  module("algorithms-js st");

  var debug = function() {
    console.log(Array.prototype.slice.call(arguments, 0));
  };

  test("HashMap#(get|put)", function() {
    var map = new algsJS.st.HashMap();
    map.put(0, 'foo');
    deepEqual(map.get(0), 'foo');

    map.put(123, 'bar');
    deepEqual(map.get(123), 'bar');

    map.put("123", 'baz');
    deepEqual(map.get(123), 'bar');
    deepEqual(map.get("123"), 'baz');

    map.put([1, 2, 3], 'qux');
    deepEqual(map.get([1, 2, 3]), 'qux');

    map.put({ a: 123, b: 345 }, 'quux');
    deepEqual(map.get({ a: 123, b: 345 }), 'quux');
    deepEqual(map.get({ b: 345, a: 123 }), 'quux');
    map.put({ a: 123, b: 345 }, 'foo');
    deepEqual(map.get({ a: 123, b: 345 }), 'foo');
    deepEqual(map.get({ b: 345, a: 123 }), 'foo');
    deepEqual(map.get({ a: 123, c: 345 }), undefined);
  });

  test("HashMap#entrySet", function() {
    var map = new algsJS.st.HashMap();
    map.put(0, 'foo');
    map.put(123, 'bar');
    map.put(345, 'baz');
    map.put(567, 'qux');
    var entries = map.entrySet();
    deepEqual(entries, [
      { key:   0, value: 'foo'}
    , { key: 123, value: 'bar'}
    , { key: 345, value: 'baz'}
    , { key: 567, value: 'qux'}
    ]);

    entries[0].value = 'foo!';
    deepEqual(map.get(0), 'foo'); // entrySet returns a defensive copy.
  });
})();
