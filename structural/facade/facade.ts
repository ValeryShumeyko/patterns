// предоставляет простой интерфейс к сложной системе классов, библиотеке или фреймворку

class StoreFacade {
    protected manager: Manager;

    protected factory: Factory;

    protected delivery: Delivery;

    constructor(manager?: Manager, factory?: Factory, delivery?: Delivery) {
        this.manager = manager || new Manager();
        this.factory = factory || new Factory();
        this.delivery = delivery || new Delivery();
    }

    /**
     * Методы Фасада удобны для быстрого доступа к сложной функциональности
     * подсистем. Однако клиенты получают только часть возможностей подсистемы.
     */
    public createOrder(): string {
        let result = 'Facade starts internal processes\n';
        result += this.manager.acceptOrder();
        result += this.factory.acceptOrder();
        result += this.manager.sendOrder();
        result += this.delivery.delivery();

        return result;
    }
}

class Manager {
    public acceptOrder(): string {
        return 'Manager: Order is accepted and sent to the factory\n';
    }

    public sendOrder(): string {
        return 'Manager: the order has been sent\n';
    }
}

/**
 * Некоторые фасады могут работать с разными подсистемами одновременно.
 */
class Factory {
    public acceptOrder(): string {
        return 'Factory: order completed\n';
    }
}

class Delivery {
    public delivery(): string {
        return 'Deliveryman: Order delivered\n';
    }
}

function test(storeFacade: StoreFacade) {
    console.log(storeFacade.createOrder());
}

const manager = new Manager();
const factory = new Factory();
const delivery = new Delivery();
const storeFacade = new StoreFacade(manager, factory, delivery);
test(storeFacade);


