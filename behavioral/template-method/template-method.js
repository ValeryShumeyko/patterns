// определяет базовые шаги исполнения алгоритма 
// и выполнение каждого из этих шагов делегирует на соответствующие методы или подклассы
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
/**
 * Абстрактный Класс определяет шаблонный метод, содержащий скелет некоторого
 * алгоритма, состоящего из вызовов абстрактных примитивных операций.
 *
 * Конкретные подклассы должны реализовать эти операции, но оставить сам
 * шаблонный метод без изменений.
 */
var Bakery = /** @class */ (function () {
    function Bakery() {
    }
    Bakery.prototype.cook = function () {
        this.makeDough();
        this.addStuffing();
        this.bake();
        this.cut();
        this.decorate();
    };
    Bakery.prototype.bake = function () {
        console.log('Bake at 180 degrees for 30 minutes');
    };
    Bakery.prototype.cut = function () {
        console.log('Cut into 5 pieces');
    };
    return Bakery;
}());
/**
 * Конкретные классы должны реализовать все абстрактные операции базового
 * класса. Они также могут переопределить некоторые операции с реализацией по
 * умолчанию.
 */
var PizzaBakery = /** @class */ (function (_super) {
    __extends(PizzaBakery, _super);
    function PizzaBakery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PizzaBakery.prototype.makeDough = function () {
        console.log('Making salt dough for pizza');
    };
    PizzaBakery.prototype.addStuffing = function () {
        console.log('Add sausage, cheese, tomatoes');
    };
    PizzaBakery.prototype.decorate = function () {
        console.log('Decorate with greenery');
    };
    return PizzaBakery;
}(Bakery));
var CupcakesBakery = /** @class */ (function (_super) {
    __extends(CupcakesBakery, _super);
    function CupcakesBakery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CupcakesBakery.prototype.makeDough = function () {
        console.log('Making sweet dough for cupcakes');
    };
    CupcakesBakery.prototype.addStuffing = function () {
        console.log('Add raisins and other dried fruits');
    };
    CupcakesBakery.prototype.decorate = function () {
        console.log('Decorate chocolate pieces');
    };
    return CupcakesBakery;
}(Bakery));
function test(bakery) {
    bakery.cook();
}
console.log('Ordering pizza');
test(new PizzaBakery());
console.log('');
console.log('Ordering cupcakes');
test(new CupcakesBakery());
