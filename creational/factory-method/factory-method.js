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
/** Класс Создатель объявляет фабричный метод, который должен возвращать объект
 * класса Продукт. Подклассы Создателя обычно предоставляют реализацию этого
 * метода. */
var PizzaStore = /** @class */ (function () {
    function PizzaStore() {
    }
    PizzaStore.prototype.orderPizza = function () {
        // Вызываем фабричный метод, чтобы получить объект-продукт.
        var pizza = this.createPizza();
        // Далее, работаем с этим продуктом.
        return "order is accepted, " + pizza.prepare() + ', ' + pizza.bake() + ', ' + pizza.cut();
    };
    return PizzaStore;
}());
/**
 * Конкретные Создатели переопределяют фабричный метод для того, чтобы изменить
 * тип результирующего продукта.
 */
var NYPizzaStore = /** @class */ (function (_super) {
    __extends(NYPizzaStore, _super);
    function NYPizzaStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NYPizzaStore.prototype.createPizza = function () {
        return new NYStylePizza();
    };
    return NYPizzaStore;
}(PizzaStore));
var ChicagoPizzaStore = /** @class */ (function (_super) {
    __extends(ChicagoPizzaStore, _super);
    function ChicagoPizzaStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChicagoPizzaStore.prototype.createPizza = function () {
        return new ChicagoStylePizza();
    };
    return ChicagoPizzaStore;
}(PizzaStore));
/**
 * Конкретные Продукты предоставляют различные реализации интерфейса Продукта.
 */
var NYStylePizza = /** @class */ (function () {
    function NYStylePizza() {
        this.name = 'NY Style pizza';
    }
    NYStylePizza.prototype.prepare = function () {
        return "preparing ".concat(this.name);
    };
    NYStylePizza.prototype.bake = function () {
        return "bake ".concat(this.name, " for 25 minutes at 350");
    };
    NYStylePizza.prototype.cut = function () {
        return "cutting the ".concat(this.name);
    };
    return NYStylePizza;
}());
var ChicagoStylePizza = /** @class */ (function () {
    function ChicagoStylePizza() {
        this.name = 'Chicago Style pizza';
    }
    ChicagoStylePizza.prototype.prepare = function () {
        return 'preparing ' + this.name;
    };
    ChicagoStylePizza.prototype.bake = function () {
        return 'bake ' + this.name + ' for 25 minutes at 350';
    };
    ChicagoStylePizza.prototype.cut = function () {
        return 'cutting the ' + this.name;
    };
    return ChicagoStylePizza;
}());
function test(creator) {
    console.log(creator.orderPizza());
}
test(new NYPizzaStore());
console.log('');
test(new ChicagoPizzaStore());
