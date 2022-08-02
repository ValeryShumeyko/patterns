//позволяет создавать сложные объекты пошагово, вызывая только те шаги, которые вам нужны
// Классы Конкретного Строителя следуют интерфейсу Строителя и предоставляют конкретные реализации шагов построения. 
var HouseBuilder = /** @class */ (function () {
    // Новый экземпляр строителя должен содержать пустой объект продукта, который используется в дальнейшей сборке.
    function HouseBuilder() {
        this.reset();
    }
    HouseBuilder.prototype.reset = function () {
        this.house = new House();
    };
    HouseBuilder.prototype.setFoundation = function () {
        this.house.parts.push('foundation');
    };
    HouseBuilder.prototype.setWalls = function () {
        this.house.parts.push('walls');
    };
    HouseBuilder.prototype.setRoof = function () {
        this.house.parts.push('roof');
    };
    HouseBuilder.prototype.setBoiler = function () {
        this.house.parts.push('boiler');
    };
    HouseBuilder.prototype.setTV = function () {
        this.house.parts.push('TV');
    };
    HouseBuilder.prototype.setConditioner = function () {
        this.house.parts.push('conditioner');
    };
    HouseBuilder.prototype.setPool = function () {
        this.house.parts.push('pool');
    };
    HouseBuilder.prototype.getProduct = function () {
        var result = this.house;
        this.reset();
        return result;
    };
    return HouseBuilder;
}());
// В отличие от других порождающих паттернов, различные конкретные строители могут производить несвязанные продукты. 
var House = /** @class */ (function () {
    function House() {
        this.parts = [];
    }
    House.prototype.listParts = function () {
        console.log("House parts: ".concat(this.parts.join(', '), "\n"));
    };
    return House;
}());
var Director = /** @class */ (function () {
    function Director() {
    }
    Director.prototype.setBuilder = function (builder) {
        this.builder = builder;
    };
    Director.prototype.buildCheapHouse = function () {
        this.builder.setFoundation();
        this.builder.setWalls();
        this.builder.setRoof();
    };
    Director.prototype.buildExpensiveHouse = function () {
        this.builder.setFoundation();
        this.builder.setWalls();
        this.builder.setRoof();
        this.builder.setBoiler();
        this.builder.setTV();
        this.builder.setConditioner();
        this.builder.setPool();
    };
    return Director;
}());
// Клиентский код создаёт объект-строитель, передаёт его директору, а затем инициирует процесс построения. 
// Конечный результат извлекается из объекта-строителя.
function test(director) {
    var builder = new HouseBuilder();
    director.setBuilder(builder);
    console.log('Standard basic house:');
    director.buildCheapHouse();
    builder.getProduct().listParts();
    console.log('Standard full featured house:');
    director.buildExpensiveHouse();
    builder.getProduct().listParts();
    console.log('Custom house:');
    builder.setFoundation();
    builder.setWalls();
    builder.setRoof();
    builder.setConditioner();
    builder.getProduct().listParts();
}
var director = new Director();
test(director);
