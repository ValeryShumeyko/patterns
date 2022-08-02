//позволяет создавать сложные объекты пошагово, вызывая только те шаги, которые вам нужны

interface Builder {
    reset(): void;
    setFoundation(): void;
    setWalls(): void;
    setRoof(): void;
    setBoiler(): void;
    setTV(): void;
    setConditioner(): void;
    setPool(): void;
}

// Классы Конкретного Строителя следуют интерфейсу Строителя и предоставляют конкретные реализации шагов построения. 
class HouseBuilder implements Builder {

    private house!: House;

    // Новый экземпляр строителя должен содержать пустой объект продукта, который используется в дальнейшей сборке.
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.house = new House();
    }

    public setFoundation(): void {
        this.house.parts.push('foundation');
    }
    public setWalls(): void {
        this.house.parts.push('walls');
    }
    public setRoof(): void {
        this.house.parts.push('roof');
    }
    public setBoiler(): void {
        this.house.parts.push('boiler');
    }
    public setTV(): void {
        this.house.parts.push('TV');
    }
    public setConditioner(): void {
        this.house.parts.push('conditioner');
    }
    public setPool(): void {
        this.house.parts.push('pool');
    }

    public getProduct(): House {
        const result = this.house;
        this.reset();
        return result;
    }
}

// В отличие от других порождающих паттернов, различные конкретные строители могут производить несвязанные продукты. 
class House {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`House parts: ${this.parts.join(', ')}\n`);
    }
}

class Director {
    private builder!: Builder;

    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    public buildCheapHouse(): void {
        this.builder.setFoundation();
        this.builder.setWalls();
        this.builder.setRoof();
    }

    public buildExpensiveHouse(): void {
        this.builder.setFoundation();
        this.builder.setWalls();
        this.builder.setRoof();
        this.builder.setBoiler();
        this.builder.setTV();
        this.builder.setConditioner();
        this.builder.setPool();
    }
}

// Клиентский код создаёт объект-строитель, передаёт его директору, а затем инициирует процесс построения. 
// Конечный результат извлекается из объекта-строителя.

function test(director: Director) {
    const builder = new HouseBuilder();
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

const director = new Director();
test(director);