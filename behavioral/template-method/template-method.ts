// определяет базовые шаги исполнения алгоритма 
// и выполнение каждого из этих шагов делегирует на соответствующие методы или подклассы

/**
 * Абстрактный Класс определяет шаблонный метод, содержащий скелет некоторого
 * алгоритма, состоящего из вызовов абстрактных примитивных операций.
 *
 * Конкретные подклассы должны реализовать эти операции, но оставить сам
 * шаблонный метод без изменений.
 */
abstract class Bakery {

    public cook(): void {
        this.makeDough();
        this.addStuffing();
        this.bake();
        this.cut();
        this.decorate();
    }

    protected abstract makeDough(): void;

    protected abstract addStuffing(): void;

    protected bake(): void {
        console.log('Bake at 180 degrees for 30 minutes');
    }

    protected cut(): void {
        console.log('Cut into 5 pieces');
    }

    protected abstract decorate(): void;
}

/**
 * Конкретные классы должны реализовать все абстрактные операции базового
 * класса. Они также могут переопределить некоторые операции с реализацией по
 * умолчанию.
 */
class PizzaBakery extends Bakery {
    protected makeDough(): void {
        console.log('Making salt dough for pizza');
    }

    protected addStuffing(): void {
        console.log('Add sausage, cheese, tomatoes');
    }

    protected decorate(): void {
        console.log('Decorate with greenery');
    }
}

class CupcakesBakery extends Bakery {
    protected makeDough(): void {
        console.log('Making sweet dough for cupcakes');
    }

    protected addStuffing(): void {
        console.log('Add raisins and other dried fruits');
    }

    protected decorate(): void {
        console.log('Decorate chocolate pieces');
    }
}

function test(bakery: Bakery) {
    bakery.cook();
}

console.log('Ordering pizza');
test(new PizzaBakery());
console.log('');

console.log('Ordering cupcakes');
test(new CupcakesBakery());