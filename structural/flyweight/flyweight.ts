// позволяет вместить бóльшее количество объектов в отведённую оперативную память. 
// Легковес экономит память, разделяя общее состояние объектов между собой, вместо хранения одинаковых данных в каждом объекте.

/**
 * Легковес хранит общую часть состояния (также называемую внутренним
 * состоянием), которая принадлежит нескольким реальным бизнес-объектам.
 * Легковес принимает оставшуюся часть состояния (внешнее состояние, уникальное
 * для каждого объекта) через его параметры метода.
 */
class PersonFlyweight {
    private insideParameters: any;

    constructor(insideParameters: any) {
        this.insideParameters = insideParameters;
    }

    public operation(outsideParameters): void {
        const s = JSON.stringify(this.insideParameters);
        const u = JSON.stringify(outsideParameters);
        console.log(`Displaying inside (${s}) and outside (${u}) parameters.`);
    }
}

/**
 * Фабрика Легковесов создает объекты-Легковесы и управляет ими. Она
 * обеспечивает правильное разделение легковесов. Когда клиент запрашивает
 * легковес, фабрика либо возвращает существующий экземпляр, либо создает новый,
 * если он ещё не существует.
 */
class PersonFlyweightFactory {
    private flyweights: {[key: string]: PersonFlyweight} = <any>{};

    constructor(initialFlyweights: string[][]) {
        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new PersonFlyweight(state);
        }
    }

    /**
     * Возвращает хеш строки Легковеса для данного состояния.
     */
    private getKey(state: string[]): string {
        return state.join('_');
    }

    /**
     * Возвращает существующий Легковес с заданным состоянием или создает новый.
     */
    public getFlyweight(insideParameters: string[]): PersonFlyweight {
        const key = this.getKey(insideParameters);

        if (!(key in this.flyweights)) {
            console.log('Can\'t find a flyweight, the factory creating new one.');
            this.flyweights[key] = new PersonFlyweight(insideParameters);
        } else {
            console.log('Flyweigh factory reusing existing flyweight.');
        }

        return this.flyweights[key];
    }

    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;
        console.log(`\n${count} flyweights:`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

/**
 * Клиентский код обычно создает кучу предварительно заполненных легковесов на
 * этапе инициализации приложения.
 */
const factory = new PersonFlyweightFactory([
    ['Ann', '21', 'woman'],
    ['Jack', '30', 'man'],
    ['Kate', '48', 'woman'],
]);
factory.listFlyweights();


function addPersonToDatabase(
    ff: PersonFlyweightFactory, height: string, weight: string, age: string, name: string, gender: string, 
) {
    console.log('\nAdding a person to database.');
    const flyweight = ff.getFlyweight([age, name, gender]);

    flyweight.operation([height, weight]);
}

addPersonToDatabase(factory, '175', '56', 'Ann', '21', 'woman');

addPersonToDatabase(factory, '180', '75', 'Jimm', '32', 'man');

factory.listFlyweights();