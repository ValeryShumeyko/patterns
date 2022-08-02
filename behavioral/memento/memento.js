// позволяет сохранять и восстанавливать предыдущие состояния объектов
/**
 * Создатель содержит некоторое важное состояние, которое может со временем
 * меняться. Он также объявляет метод сохранения состояния внутри снимка и метод
 * восстановления состояния из него.
 */
var Spreadsheet = /** @class */ (function () {
    function Spreadsheet(state) {
        this.state = state;
        console.log("My initial state is: ".concat(state));
    }
    /**
     * Бизнес-логика Создателя может повлиять на его внутреннее состояние.
     * Поэтому клиент должен выполнить резервное копирование состояния с помощью
     * метода save перед запуском методов бизнес-логики.
     */
    Spreadsheet.prototype.addLine = function (text) {
        // console.log('Add a new line');
        this.state = text;
        console.log("Add a new line: ".concat(text));
    };
    /**
     * Сохраняет текущее состояние внутри снимка.
     */
    Spreadsheet.prototype.save = function () {
        return new SpreadsheetMemento(this.state);
    };
    /**
     * Восстанавливает состояние Создателя из объекта снимка.
     */
    Spreadsheet.prototype.restore = function (memento) {
        this.state = memento.getState();
        console.log("Going back: ".concat(this.state));
    };
    return Spreadsheet;
}());
/**
 * Конкретный снимок содержит инфраструктуру для хранения состояния Создателя.
 */
var SpreadsheetMemento = /** @class */ (function () {
    function SpreadsheetMemento(state) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    /**
     * Создатель использует этот метод, когда восстанавливает своё состояние.
     */
    SpreadsheetMemento.prototype.getState = function () {
        return this.state;
    };
    /**
     * Остальные методы используются Опекуном для отображения метаданных.
     */
    SpreadsheetMemento.prototype.getName = function () {
        return "".concat(this.date, " / (").concat(this.state, ")");
    };
    SpreadsheetMemento.prototype.getDate = function () {
        return this.date;
    };
    return SpreadsheetMemento;
}());
/**
 * Опекун не зависит от класса Конкретного Снимка. Таким образом, он не имеет
 * доступа к состоянию создателя, хранящемуся внутри снимка. Он работает со
 * всеми снимками через базовый интерфейс Снимка.
 */
var Caretaker = /** @class */ (function () {
    function Caretaker(spreadsheet) {
        this.mementos = [];
        this.spreadsheet = spreadsheet;
    }
    Caretaker.prototype.backup = function () {
        console.log('Saving last state...');
        this.mementos.push(this.spreadsheet.save());
    };
    Caretaker.prototype.undo = function () {
        if (!this.mementos.length) {
            return;
        }
        var memento = this.mementos.pop();
        console.log("Restoring state to: ".concat(memento.getName()));
        this.spreadsheet.restore(memento);
    };
    Caretaker.prototype.showHistory = function () {
        console.log('Here is the list of mementos:');
        for (var _i = 0, _a = this.mementos; _i < _a.length; _i++) {
            var memento = _a[_i];
            console.log(memento.getName());
        }
    };
    return Caretaker;
}());
/**
 * Клиентский код.
 */
var spreadsheet = new Spreadsheet('First entry in the table');
var caretaker = new Caretaker(spreadsheet);
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
