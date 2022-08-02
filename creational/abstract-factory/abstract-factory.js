//Когда бизнес-логика программы должна работать с разными видами связанных друг с другом продуктов, 
//не завися от конкретных классов продуктов.
// сигнатуры методов Конкретной Фабрики возвращают абстрактный продукт, в то 
// время как внутри метода создается экземпляр конкретного продукта.
var NYPizzaFactory = /** @class */ (function () {
    function NYPizzaFactory() {
    }
    NYPizzaFactory.prototype.createSauce = function () {
        return new MarinaraSauce();
    };
    NYPizzaFactory.prototype.createCheese = function () {
        return new ReggianoCheese();
    };
    return NYPizzaFactory;
}());
/**
 * Каждая Конкретная Фабрика имеет соответствующую вариацию продукта.
 */
var ChicagoPizzaFactory = /** @class */ (function () {
    function ChicagoPizzaFactory() {
    }
    ChicagoPizzaFactory.prototype.createSauce = function () {
        return new PlumTomatoSauce();
    };
    ChicagoPizzaFactory.prototype.createCheese = function () {
        return new MozzarellaCheese();
    };
    return ChicagoPizzaFactory;
}());
/**
 * Эти Конкретные Продукты создаются соответствующими Конкретными Фабриками.
 */
var MarinaraSauce = /** @class */ (function () {
    function MarinaraSauce() {
        this.name = 'Marinara Sauce';
    }
    MarinaraSauce.prototype.addSauce = function () {
        return "".concat(this.name, " added");
    };
    return MarinaraSauce;
}());
var PlumTomatoSauce = /** @class */ (function () {
    function PlumTomatoSauce() {
        this.name = 'Plum Tomato Sauce';
    }
    PlumTomatoSauce.prototype.addSauce = function () {
        return "".concat(this.name, " added");
    };
    return PlumTomatoSauce;
}());
/**
 * Эти Конкретные Продукты создаются соответствующими Конкретными Фабриками.
 */
var MozzarellaCheese = /** @class */ (function () {
    function MozzarellaCheese() {
        this.name = 'Mozzarella Cheese';
    }
    MozzarellaCheese.prototype.addCheese = function () {
        return "".concat(this.name, " added");
    };
    return MozzarellaCheese;
}());
var ReggianoCheese = /** @class */ (function () {
    function ReggianoCheese() {
        this.name = 'Reggiano Cheese';
    }
    ReggianoCheese.prototype.addCheese = function () {
        return "".concat(this.name, " added");
    };
    return ReggianoCheese;
}());
/** Клиентский код работает с фабриками и продуктами только через абстрактные
 * типы: Абстрактная Фабрика и Абстрактный Продукт. Это позволяет передавать
 * любой подкласс фабрики или продукта клиентскому коду, не нарушая его.
 */
function pizzaStore(factory) {
    var sauce = factory.createSauce();
    var cheese = factory.createCheese();
    console.log(cheese.addCheese());
    console.log(sauce.addSauce());
}
/**
 * Клиентский код может работать с любым конкретным классом фабрики.
 */
console.log('Cooking NY pizza...');
pizzaStore(new NYPizzaFactory());
console.log('');
console.log('Cooking Chicago pizza...');
pizzaStore(new ChicagoPizzaFactory());
