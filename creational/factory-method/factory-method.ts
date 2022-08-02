/** Класс Создатель объявляет фабричный метод, который должен возвращать объект
 * класса Продукт. Подклассы Создателя обычно предоставляют реализацию этого
 * метода. */
abstract class PizzaStore {

    public abstract createPizza(): Pizza;

    public orderPizza() {
        // Вызываем фабричный метод, чтобы получить объект-продукт.
        const pizza = this.createPizza();
        // Далее, работаем с этим продуктом.
        return `order is accepted, ` + pizza.prepare() + ', ' + pizza.bake() + ', ' + pizza.cut();
    }
}

/**
 * Конкретные Создатели переопределяют фабричный метод для того, чтобы изменить
 * тип результирующего продукта.
 */
class NYPizzaStore extends PizzaStore {

    public createPizza(): Pizza {
        return new NYStylePizza();
    }
}

class ChicagoPizzaStore extends PizzaStore {
    public createPizza(): Pizza {
        return new ChicagoStylePizza();
    }
}

/**
 * Интерфейс Продукта объявляет операции, которые должны выполнять все
 * конкретные продукты.
 */
interface Pizza {
    name: string;
    prepare(): string;
    bake(): string;
    cut(): string;
}

/**
 * Конкретные Продукты предоставляют различные реализации интерфейса Продукта.
 */
class NYStylePizza implements Pizza {
    name = 'NY Style pizza';
    public prepare(): string {
        return `preparing ${this.name}`;
    }
    public bake(): string {
        return `bake ${this.name} for 25 minutes at 350`;
    }
    public cut(): string {
        return `cutting the ${this.name}`;
    }
}

class ChicagoStylePizza implements Pizza {
    name = 'Chicago Style pizza';
    public prepare(): string {
        return 'preparing ' + this.name;
    }
    public bake(): string {
        return 'bake ' + this.name + ' for 25 minutes at 350';
    }
    public cut(): string {
        return 'cutting the ' + this.name;
    }
}

function test(creator: PizzaStore) {
    console.log(creator.orderPizza());
}

test(new NYPizzaStore());
console.log('');
test(new ChicagoPizzaStore());

