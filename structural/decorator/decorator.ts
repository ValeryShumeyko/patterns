// позволяет динамически добавлять объектам новую функциональность, оборачивая их в полезные «обёртки».

interface Person {
    dress(): string;
}

class Man implements Person {
    public dress(): string {
        return 'Man';
    }
}

class Clothes implements Person {
    protected person: Person;

    constructor(person: Person) {
        this.person = person;
    }

    public dress(): string {
        return this.person.dress();
    }
}

/**
 * Конкретные Декораторы вызывают обёрнутый объект и изменяют его результат
 * некоторым образом.
 */
class TShirt extends Clothes {

    public dress(): string {
        return `${super.dress()} in t-shirt`;
    }
}

/**
 * Декораторы могут выполнять своё поведение до или после вызова обёрнутого
 * объекта.
 */
class Jacket extends Clothes {
    public dress(): string {
        return `${super.dress()} in jacket`;
    }
}


function test(person: Person) {
    console.log(`Result: ${person.dress()}`);
}

const man = new Man();
console.log('While it\'s hot outside, man can not wear a T-shirt');
test(man);
console.log('');

console.log('It became colder, the man dresses the t-shirt')
const tshirt = new TShirt(man);
test(tshirt);
console.log('');

const jacket = new Jacket(tshirt);
console.log('Add a jacket');
test(jacket);