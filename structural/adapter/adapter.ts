// позволяет объектам с несовместимыми интерфейсами работать вместе.

/**
 * Целевой класс объявляет интерфейс, с которым может работать клиентский код.
 */
class Meters {
    public requestMeters(): string {
        return 'I can process the request in meters';
    }
}

/**
 * Адаптируемый класс содержит некоторое полезное поведение, но его интерфейс
 * несовместим с существующим клиентским кодом. Адаптируемый класс нуждается в
 * некоторой доработке, прежде чем клиентский код сможет его использовать.
 */
class Feet {
    public requestFeet(): string {
        return 'Send request in pounds';
    }
}

/**
 * Адаптер делает интерфейс Адаптируемого класса совместимым с целевым
 * интерфейсом.
 */
class Adapter extends Meters {
    private feet: Feet;

    constructor(feet: Feet) {
        super();
        this.feet = feet;
    }

    public requestMeters(): string {
        return `Convert feet to meters`;
    }
}

/**
 * Клиентский код поддерживает все классы, использующие целевой интерфейс.
 */
function test(meters: Meters) {
    console.log(meters.requestMeters());
}

console.log('I send request in meters');
const meters = new Meters();
test(meters);

console.log('');

const feet = new Feet();
console.log(`${feet.requestFeet()}`);
console.log('Client received a request in feet, but it does not understand it');

console.log('');

console.log('Client asks adapter to convert feet to meters');
const adapter = new Adapter(feet);
test(adapter);