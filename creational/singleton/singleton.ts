export {};
/* Когда в программе должен быть единственный экземпляр какого-то класса, 
доступный всем клиентам. Одиночка предоставляет метод getInstance, который позволяет клиентам
получить доступ к уникальному экземпляру одиночки.  */


//корзина интернет магазина
class Basket {
    private static instance: Basket;

/*Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
создание объекта через оператор new.*/
    private constructor() { }

    public static getInstance(): Basket {
        if (!Basket.instance) {
            Basket.instance = new Basket();
        }

        return Basket.instance;
    }
}

/**
 * Клиентский код.
 */
function test() {
    const s1 = Basket.getInstance();
    const s2 = Basket.getInstance();

    if (s1 === s2) {
        console.log('It is the same object');
    } else {
        console.log('They are different objects');
    }
}

test();