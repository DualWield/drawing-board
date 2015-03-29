(function (_) {
    _.mixin({
        distanceBetween: function (point1, point2) {
            return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
        },
        angleBetween: function (point1, point2) {
            return Math.atan2(point2.x - point1.x, point2.y - point1.y);
        },
        midPoint: function (p1, p2) {
            return {
                x: (p2.x + p1.x) / 2,
                y: (p2.y + p1.y) / 2
            };
        },
        rgbToHex: function (R, G, B) {
            return _.toHex(R) + _.toHex(G) + _.toHex(B)
        },
        toHex: function (n) {
            n = parseInt(n, 10);
            if (isNaN(n)) return "00";
            n = Math.max(0, Math.min(n, 255));
            return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
        }
    })
})(_);


function Class() {
}

Class.extend = function extend(props) {

    var prototype = new this();
    var _super = this.prototype;

    for (var name in props) {

        if (typeof props[name] == "function"
            && typeof _super[name] == "function") {

            prototype[name] = (function (super_fn, fn) {
                return function () {
                    var tmp = this.callSuper;

                    this.callSuper = super_fn;

                    var ret = fn.apply(this, arguments);

                    this.callSuper = tmp;

                    if (!this.callSuper) {
                        delete this.callSuper;
                    }
                    return ret;
                }
            })(_super[name], props[name])
        } else {
            prototype[name] = props[name];
        }
    }

    function Class() {
    }

    Class.prototype = prototype;
    Class.prototype.constructor = Class;

    Class.extend = extend;
    Class.create = Class.prototype.create = function () {

        var instance = new this();

        if (instance.init) {
            instance.init.apply(instance, arguments);
        }

        return instance;
    };

    return Class;
};

/*
 var Human = Class.extend({
 init: function () {
 this.nature = "Human";
 },
 say: function () {
 console.log("I am a human");
 }
 });

 var human = Human.create();
 console.log(human);
 human.say();

 var Man = Human.extend({
 init: function () {
 this.callSuper();
 this.sex = "man";
 },
 say: function () {
 this.callSuper();
 console.log("I am a man");
 }
 });

 var man = Man.create();
 console.log(man);
 man.say();

 var Person = Man.extend({
 init: function () {
 this.callSuper();
 this.name = "lee";
 },
 say: function () {
 this.callSuper();
 console.log("I am Lee");
 }
 })

 var person = Person.create();
 console.log(person);
 person.say();*/
