"use strict";
exports.__esModule = true;
//позволяет копировать объекты, не вдаваясь в подробности их реализации.
//Когда ваш код не должен зависеть от классов копируемых объектов.
var PizzaPrototype = /** @class */ (function () {
    function PizzaPrototype(timeForPreparing, sauce, cheese, garlic) {
        this.timeForPreparing = timeForPreparing;
        this.sauce = sauce;
        this.cheese = cheese;
        this.garlic = garlic;
    }
    PizzaPrototype.prototype.clone = function () {
        var clone = Object.create(this);
        return clone;
    };
    return PizzaPrototype;
}());
/**
* Клиентский код.
*/
function test() {
    var pizza = new PizzaPrototype(245, 'Marinara sauce');
    var cheesePizza = pizza.clone();
    cheesePizza.cheese = true;
    var carbonaraPizza = pizza.clone();
    carbonaraPizza.garlic = true;
    console.log(pizza);
    console.log(cheesePizza.sauce);
    console.log(cheesePizza);
    console.log(carbonaraPizza);
    console.log(carbonaraPizza.timeForPreparing);
}
test();
