// позволяет динамически добавлять объектам новую функциональность, оборачивая их в полезные «обёртки».
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Man = /** @class */ (function () {
    function Man() {
    }
    Man.prototype.dress = function () {
        return 'Man';
    };
    return Man;
}());
var Clothes = /** @class */ (function () {
    function Clothes(person) {
        this.person = person;
    }
    Clothes.prototype.dress = function () {
        return this.person.dress();
    };
    return Clothes;
}());
/**
 * Конкретные Декораторы вызывают обёрнутый объект и изменяют его результат
 * некоторым образом.
 */
var TShirt = /** @class */ (function (_super) {
    __extends(TShirt, _super);
    function TShirt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TShirt.prototype.dress = function () {
        return "".concat(_super.prototype.dress.call(this), " in t-shirt");
    };
    return TShirt;
}(Clothes));
/**
 * Декораторы могут выполнять своё поведение до или после вызова обёрнутого
 * объекта.
 */
var Jacket = /** @class */ (function (_super) {
    __extends(Jacket, _super);
    function Jacket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Jacket.prototype.dress = function () {
        return "".concat(_super.prototype.dress.call(this), " in jacket");
    };
    return Jacket;
}(Clothes));
function test(person) {
    console.log("Result: ".concat(person.dress()));
}
var man = new Man();
console.log('While it\'s hot outside, man can not wear a T-shirt');
test(man);
console.log('');
console.log('It became colder, the man dresses the t-shirt');
var tshirt = new TShirt(man);
test(tshirt);
console.log('');
var jacket = new Jacket(tshirt);
console.log('Add a jacket');
test(jacket);
