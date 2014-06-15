(function() {
  module("algorithms-js core");

  test("VERSION", function() {
    deepEqual(algsJS.VERSION, "0.0.0");
  });

  test("Util.extend", function() {
    var Util = algsJS.Util;
    var obj = Util.extend({}, { foo: "bar", baz: 123 });
    deepEqual(obj, { foo: "bar", baz: 123 });
  });

  test("Extendable", function() {
    var Util = algsJS.Util;

    var ClassA = function(name) {
      this.name = name;
    };
    ClassA.prototype = {
      getName: function() {
        return this.name;
      }

    , setName: function(name) {
        this.name = name;
        return this;
      }
    };
    var a = new ClassA("foo");
    deepEqual(a.getName(), "foo");
    deepEqual(a.setName("bar").getName(), "bar");

    Util.extend(ClassA, algsJS.Extendable);
    var ClassB = ClassA.extend({
      constructor: function(name, age) {
        this.age = age;
        ClassA.apply(this, [name]);
      }

    , sayHello: function() {
        return "Hello, call me " + this.name + ". I'm " + this.age + " years old.";
      }
    });
    var b = new ClassB("baz", 25);
    deepEqual(b.sayHello(), "Hello, call me baz. I'm 25 years old.");
  });
})();
