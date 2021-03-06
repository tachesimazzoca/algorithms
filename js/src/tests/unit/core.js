(function() {
  module("algorithms-js core");

  test("VERSION", function() {
    deepEqual(algsJS.VERSION, "0.0.0");
  });

  test("Extendable", function() {
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

    _.extend(ClassA, algsJS.Extendable);
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

  test("Events", function() {
    var ClassA = function() {};
    _.extend(ClassA.prototype, algsJS.Events);

    var a = new ClassA();
    a.on('update', function(key, n, s, a) {
      deepEqual(key, 'update');
      deepEqual(n, 1);
      deepEqual(s, 'foo');
      deepEqual(a, ['a', 'b']);
    });
    a.trigger('update', 1, 'foo', ['a', 'b']);
  });
})();
