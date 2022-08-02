//Когда бизнес-логика программы должна работать с разными видами связанных друг с другом продуктов, 
//не завися от конкретных классов продуктов.

//Когда в программе уже используется Фабричный метод, но очередные изменения предполагают введение новых типов продуктов.


// Интерфейс Абстрактной Фабрики объявляет набор методов, которые возвращают различные абстрактные продукты. 

interface PizzaFactory {

    createSauce(): Sauce;
    createCheese(): Cheese;
}

// сигнатуры методов Конкретной Фабрики возвращают абстрактный продукт, в то 
// время как внутри метода создается экземпляр конкретного продукта.

class NYPizzaFactory implements PizzaFactory {
    public createSauce(): Sauce {
        return new MarinaraSauce();
    }

    public createCheese(): Cheese {
        return new ReggianoCheese();
    }
}

/**
 * Каждая Конкретная Фабрика имеет соответствующую вариацию продукта.
 */
class ChicagoPizzaFactory implements PizzaFactory {
    public createSauce(): Sauce {
        return new PlumTomatoSauce();
    }

    public createCheese(): Cheese {
        return new MozzarellaCheese();
    }
}

/**
 * Каждый отдельный продукт семейства продуктов должен иметь базовый интерфейс.
 * Все вариации продукта должны реализовывать этот интерфейс.
 */
interface Sauce {
    name: string;
    addSauce(): string;
}

/**
 * Эти Конкретные Продукты создаются соответствующими Конкретными Фабриками.
 */
class MarinaraSauce implements Sauce {
    public name = 'Marinara Sauce';
    public addSauce(): string {
        return `${this.name} added`;
    }
}

class PlumTomatoSauce implements Sauce {
    public name = 'Plum Tomato Sauce';
    public addSauce(): string {
        return `${this.name} added`;
    }
}


interface Cheese {
    name: string;
    addCheese(): string;
}

/**
 * Эти Конкретные Продукты создаются соответствующими Конкретными Фабриками.
 */
class MozzarellaCheese implements Cheese {

    public name = 'Mozzarella Cheese';

    public addCheese(): string {
        return `${this.name} added`;
    }
}

class ReggianoCheese implements Cheese {

    public name = 'Reggiano Cheese';

    public addCheese(): string {
        return `${this.name} added`;
    }
}

/** Клиентский код работает с фабриками и продуктами только через абстрактные
 * типы: Абстрактная Фабрика и Абстрактный Продукт. Это позволяет передавать
 * любой подкласс фабрики или продукта клиентскому коду, не нарушая его.
 */
function pizzaStore(factory: PizzaFactory) {
    const sauce = factory.createSauce();
    const cheese = factory.createCheese();

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