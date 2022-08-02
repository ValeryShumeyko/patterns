// предоставляет простой интерфейс к сложной системе классов, библиотеке или фреймворку
var StoreFacade = /** @class */ (function () {
    function StoreFacade(manager, factory, delivery) {
        this.manager = manager || new Manager();
        this.factory = factory || new Factory();
        this.delivery = delivery || new Delivery();
    }
    /**
     * Методы Фасада удобны для быстрого доступа к сложной функциональности
     * подсистем. Однако клиенты получают только часть возможностей подсистемы.
     */
    StoreFacade.prototype.createOrder = function () {
        var result = 'Facade starts internal processes\n';
        result += this.manager.acceptOrder();
        result += this.factory.acceptOrder();
        result += this.manager.sendOrder();
        result += this.delivery.delivery();
        return result;
    };
    return StoreFacade;
}());
var Manager = /** @class */ (function () {
    function Manager() {
    }
    Manager.prototype.acceptOrder = function () {
        return 'Manager: Order is accepted and sent to the factory\n';
    };
    Manager.prototype.sendOrder = function () {
        return 'Manager: the order has been sent\n';
    };
    return Manager;
}());
/**
 * Некоторые фасады могут работать с разными подсистемами одновременно.
 */
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.acceptOrder = function () {
        return 'Factory: order completed\n';
    };
    return Factory;
}());
var Delivery = /** @class */ (function () {
    function Delivery() {
    }
    Delivery.prototype.delivery = function () {
        return 'Deliveryman: Order delivered\n';
    };
    return Delivery;
}());
function test(storeFacade) {
    console.log(storeFacade.createOrder());
}
var manager = new Manager();
var factory = new Factory();
var delivery = new Delivery();
var storeFacade = new StoreFacade(manager, factory, delivery);
test(storeFacade);
