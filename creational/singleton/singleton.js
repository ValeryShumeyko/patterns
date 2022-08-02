"use strict";
exports.__esModule = true;
/* Когда в программе должен быть единственный экземпляр какого-то класса,
доступный всем клиентам. Одиночка предоставляет метод getInstance, который позволяет клиентам
получить доступ к уникальному экземпляру одиночки.  */
//корзина интернет магазина
var Basket = /** @class */ (function () {
    /*Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
    создание объекта через оператор new.*/
    function Basket() {
    }
    Basket.getInstance = function () {
        if (!Basket.instance) {
            Basket.instance = new Basket();
        }
        return Basket.instance;
    };
    return Basket;
}());
/**
 * Клиентский код.
 */
function test() {
    var s1 = Basket.getInstance();
    var s2 = Basket.getInstance();
    if (s1 === s2) {
        console.log('It is the same object');
    }
    else {
        console.log('They are different objects');
    }
}
test();
