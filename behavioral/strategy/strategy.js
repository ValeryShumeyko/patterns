// определяет схожие алгоритмы и помещает их в каждый отдельный класс
// после чего между этими алгоритмами можно автоматически переключаться в ходе выполнения программы
var Counter = /** @class */ (function () {
    /**
     * Обычно Контекст принимает стратегию через конструктор, а также
     * предоставляет сеттер для её изменения во время выполнения.
     */
    function Counter(numbersStrategy) {
        this.numbersStrategy = numbersStrategy;
    }
    Counter.prototype.setStrategy = function (numbersStrategy) {
        this.numbersStrategy = numbersStrategy;
    };
    /**
     * Вместо того, чтобы самостоятельно реализовывать множественные версии
     * алгоритма, Контекст делегирует некоторую работу объекту Стратегии.
     */
    Counter.prototype.start = function () {
        // ...
        console.log('Sorting data using the strategy');
        var result = this.numbersStrategy.sortNumbers(['1', '2', '3', '4', '5']);
        console.log(result.join(','));
        // ...
    };
    return Counter;
}());
var NumbersDefaultStrategy = /** @class */ (function () {
    function NumbersDefaultStrategy() {
    }
    NumbersDefaultStrategy.prototype.sortNumbers = function (data) {
        return data.sort();
    };
    return NumbersDefaultStrategy;
}());
var NumbersReverseStrategy = /** @class */ (function () {
    function NumbersReverseStrategy() {
    }
    NumbersReverseStrategy.prototype.sortNumbers = function (data) {
        return data.reverse();
    };
    return NumbersReverseStrategy;
}());
/**
 * Клиентский код выбирает конкретную стратегию и передаёт её в контекст. Клиент
 * должен знать о различиях между стратегиями, чтобы сделать правильный выбор.
 */
var counter = new Counter(new NumbersDefaultStrategy());
console.log('Strategy is set to normal sorting.');
counter.start();
console.log('');
console.log('Strategy is set to reverse sorting.');
counter.setStrategy(new NumbersReverseStrategy());
counter.start();
