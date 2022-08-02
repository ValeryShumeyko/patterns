// позволяет объектам с несовместимыми интерфейсами работать вместе.
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
 * Целевой класс объявляет интерфейс, с которым может работать клиентский код.
 */
var Meters = /** @class */ (function () {
    function Meters() {
    }
    Meters.prototype.requestMeters = function () {
        return 'I can process the request in meters';
    };
    return Meters;
}());
/**
 * Адаптируемый класс содержит некоторое полезное поведение, но его интерфейс
 * несовместим с существующим клиентским кодом. Адаптируемый класс нуждается в
 * некоторой доработке, прежде чем клиентский код сможет его использовать.
 */
var Feet = /** @class */ (function () {
    function Feet() {
    }
    Feet.prototype.requestFeet = function () {
        return 'Send request in pounds';
    };
    return Feet;
}());
/**
 * Адаптер делает интерфейс Адаптируемого класса совместимым с целевым
 * интерфейсом.
 */
var Adapter = /** @class */ (function (_super) {
    __extends(Adapter, _super);
    function Adapter(feet) {
        var _this = _super.call(this) || this;
        _this.feet = feet;
        return _this;
    }
    Adapter.prototype.requestMeters = function () {
        return "Convert feet to meters";
    };
    return Adapter;
}(Meters));
/**
 * Клиентский код поддерживает все классы, использующие целевой интерфейс.
 */
function test(meters) {
    console.log(meters.requestMeters());
}
console.log('I send request in meters');
var meters = new Meters();
test(meters);
console.log('');
var feet = new Feet();
console.log("".concat(feet.requestFeet()));
console.log('Client received a request in feet, but it does not understand it');
console.log('');
console.log('Client asks adapter to convert feet to meters');
var adapter = new Adapter(feet);
test(adapter);
