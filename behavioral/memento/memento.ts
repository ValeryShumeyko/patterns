// позволяет сохранять и восстанавливать предыдущие состояния объектов

/**
 * Создатель содержит некоторое важное состояние, которое может со временем
 * меняться. Он также объявляет метод сохранения состояния внутри снимка и метод
 * восстановления состояния из него.
 */
class Spreadsheet {
    /**
     * Для удобства состояние создателя хранится внутри одной переменной.
     */
    private state: string;

    private text!: string;

    constructor(state: string) {
        this.state = state;
        console.log(`My initial state is: ${state}`);
    }

    /**
     * Бизнес-логика Создателя может повлиять на его внутреннее состояние.
     * Поэтому клиент должен выполнить резервное копирование состояния с помощью
     * метода save перед запуском методов бизнес-логики.
     */
    public addLine(text: string): void {
       // console.log('Add a new line');
        this.state = text;
        console.log(`Add a new line: ${text}`);
    }

    /**
     * Сохраняет текущее состояние внутри снимка.
     */
    public save(): Memento {
        return new SpreadsheetMemento(this.state);
    }

    /**
     * Восстанавливает состояние Создателя из объекта снимка.
     */
    public restore(memento: Memento): void {
        this.state = memento.getState();
        console.log(`Going back: ${this.state}`);
    }
}

/**
 * Интерфейс Снимка предоставляет способ извлечения метаданных снимка, таких как
 * дата создания или название. Однако он не раскрывает состояние Создателя.
 */
interface Memento {
    getState(): string;

    getName(): string;

    getDate(): string;
}

/**
 * Конкретный снимок содержит инфраструктуру для хранения состояния Создателя.
 */
class SpreadsheetMemento implements Memento {
    private state: string;

    private date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    /**
     * Создатель использует этот метод, когда восстанавливает своё состояние.
     */
    public getState(): string {
        return this.state;
    }

    /**
     * Остальные методы используются Опекуном для отображения метаданных.
     */
    public getName(): string {
        return `${this.date} / (${this.state})`;
    }

    public getDate(): string {
        return this.date;
    }
}

/**
 * Опекун не зависит от класса Конкретного Снимка. Таким образом, он не имеет
 * доступа к состоянию создателя, хранящемуся внутри снимка. Он работает со
 * всеми снимками через базовый интерфейс Снимка.
 */
class Caretaker {
    private mementos: Memento[] = [];

    private spreadsheet: Spreadsheet;

    constructor(spreadsheet: Spreadsheet) {
        this.spreadsheet = spreadsheet;
    }

    public backup(): void {
        console.log('Saving last state...');
        this.mementos.push(this.spreadsheet.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        console.log(`Restoring state to: ${memento.getName()}`);
        this.spreadsheet.restore(memento);
    }

    public showHistory(): void {
        console.log('Here is the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

/**
 * Клиентский код.
 */
const spreadsheet = new Spreadsheet('First entry in the table');
const caretaker = new Caretaker(spreadsheet);

caretaker.backup();
spreadsheet.addLine('Second entry in the table');

caretaker.backup();
spreadsheet.addLine('Third entry in the table');

caretaker.backup();
spreadsheet.addLine('Fourth entry in the table');

console.log('');
caretaker.showHistory();

console.log('Let\'s take a step back');
caretaker.undo();

console.log('Once more!');
caretaker.undo();