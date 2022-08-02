export {};

//позволяет копировать объекты, не вдаваясь в подробности их реализации.
//Когда ваш код не должен зависеть от классов копируемых объектов.

class PizzaPrototype {
    constructor (
    public timeForPreparing: number,
    public sauce: string,
    public cheese?: boolean,
    public garlic?: boolean
    ){}

    public clone(): this {
        const clone = Object.create(this);

        return clone;
    }
}

/**
* Клиентский код.
*/
function test() {
    const pizza = new PizzaPrototype(245, 'Marinara sauce');
    const cheesePizza = pizza.clone();
    cheesePizza.cheese = true;
    const carbonaraPizza = pizza.clone();
    carbonaraPizza.garlic = true;

    console.log(pizza);
    console.log(cheesePizza.sauce);
    console.log(cheesePizza);
    console.log(carbonaraPizza);
    console.log(carbonaraPizza.timeForPreparing);
}

test();