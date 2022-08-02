// позволяет вместить бóльшее количество объектов в отведённую оперативную память. 
// Легковес экономит память, разделяя общее состояние объектов между собой, вместо хранения одинаковых данных в каждом объекте.
/**
 * Легковес хранит общую часть состояния (также называемую внутренним
 * состоянием), которая принадлежит нескольким реальным бизнес-объектам.
 * Легковес принимает оставшуюся часть состояния (внешнее состояние, уникальное
 * для каждого объекта) через его параметры метода.
 */
var PersonFlyweight = /** @class */ (function () {
    function PersonFlyweight(insideParameters) {
        this.insideParameters = insideParameters;
    }
    PersonFlyweight.prototype.operation = function (outsideParameters) {
        var s = JSON.stringify(this.insideParameters);
        var u = JSON.stringify(outsideParameters);
        console.log("Displaying inside (".concat(s, ") and outside (").concat(u, ") parameters."));
    };
    return PersonFlyweight;
}());
/**
 * Фабрика Легковесов создает объекты-Легковесы и управляет ими. Она
 * обеспечивает правильное разделение легковесов. Когда клиент запрашивает
 * легковес, фабрика либо возвращает существующий экземпляр, либо создает новый,
 * если он ещё не существует.
 */
var PersonFlyweightFactory = /** @class */ (function () {
    function PersonFlyweightFactory(initialFlyweights) {
        this.flyweights = {};
        for (var _i = 0, initialFlyweights_1 = initialFlyweights; _i < initialFlyweights_1.length; _i++) {
            var state = initialFlyweights_1[_i];
            this.flyweights[this.getKey(state)] = new PersonFlyweight(state);
        }
    }
    /**
     * Возвращает хеш строки Легковеса для данного состояния.
     */
    PersonFlyweightFactory.prototype.getKey = function (state) {
        return state.join('_');
    };
    /**
     * Возвращает существующий Легковес с заданным состоянием или создает новый.
     */
    PersonFlyweightFactory.prototype.getFlyweight = function (insideParameters) {
        var key = this.getKey(insideParameters);
        if (!(key in this.flyweights)) {
            console.log('Can\'t find a flyweight, the factory creating new one.');
            this.flyweights[key] = new PersonFlyweight(insideParameters);
        }
        else {
            console.log('Flyweigh factory reusing existing flyweight.');
        }
        return this.flyweights[key];
    };
    PersonFlyweightFactory.prototype.listFlyweights = function () {
        var count = Object.keys(this.flyweights).length;
        console.log("\n".concat(count, " flyweights:"));
        for (var key in this.flyweights) {
            console.log(key);
        }
    };
    return PersonFlyweightFactory;
}());
/**
 * Клиентский код обычно создает кучу предварительно заполненных легковесов на
 * этапе инициализации приложения.
 */
var factory = new PersonFlyweightFactory([
    ['Ann', '21', 'woman'],
    ['Jack', '30', 'man'],
    ['Kate', '48', 'woman'],
]);
factory.listFlyweights();
function addPersonToDatabase(ff, height, weight, age, name, gender) {
    console.log('\nAdding a person to database.');
    var flyweight = ff.getFlyweight([age, name, gender]);
    flyweight.operation([height, weight]);
}
addPersonToDatabase(factory, '175', '56', 'Ann', '21', 'woman');
addPersonToDatabase(factory, '180', '75', 'Jimm', '32', 'man');
factory.listFlyweights();
