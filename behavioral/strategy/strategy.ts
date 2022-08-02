// определяет схожие алгоритмы и помещает их в каждый отдельный класс
// после чего между этими алгоритмами можно автоматически переключаться в ходе выполнения программы

class Counter {
    /**
    @type {NumbersStrategy} Контекст хранит ссылку на один из объектов Стратегии.
     * Контекст не знает конкретного класса стратегии. Он должен работать со
     * всеми стратегиями через интерфейс Стратегии.  */

    private numbersStrategy: NumbersStrategy;

    /**
     * Обычно Контекст принимает стратегию через конструктор, а также
     * предоставляет сеттер для её изменения во время выполнения.
     */
    constructor(numbersStrategy: NumbersStrategy) {
        this.numbersStrategy = numbersStrategy;
    }

    public setStrategy(numbersStrategy: NumbersStrategy) {
        this.numbersStrategy = numbersStrategy;
    }

    /**
     * Вместо того, чтобы самостоятельно реализовывать множественные версии
     * алгоритма, Контекст делегирует некоторую работу объекту Стратегии.
     */
    public start(): void {
        // ...

        console.log('Sorting data using the strategy');
        const result = this.numbersStrategy.sortNumbers(['1', '2', '3', '4', '5']);
        console.log(result.join(','));

        // ...
    }
}

/**
 * Контекст использует этот интерфейс для вызова алгоритма, определённого
 * Конкретными Стратегиями.
 */
interface NumbersStrategy {
    sortNumbers(data: string[]): string[];
}

class NumbersDefaultStrategy implements NumbersStrategy {
    public sortNumbers(data: string[]): string[] {
        return data.sort();
    }
}

class NumbersReverseStrategy implements NumbersStrategy {
    public sortNumbers(data: string[]): string[] {
        return data.reverse();
    }
}

/**
 * Клиентский код выбирает конкретную стратегию и передаёт её в контекст. Клиент
 * должен знать о различиях между стратегиями, чтобы сделать правильный выбор.
 */
const counter = new Counter(new NumbersDefaultStrategy());
console.log('Strategy is set to normal sorting.');
counter.start();

console.log('');

console.log('Strategy is set to reverse sorting.');
counter.setStrategy(new NumbersReverseStrategy());
counter.start();