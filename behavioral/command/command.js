// помогает инкапсулировать некоторые действия и необходимые для них данные
// позволяет отделить клиента от получателя, превращает запросы в объекты, что позволяет передавать их как аргументы в методы
/**
 * Некоторые команды способны выполнять простые операции самостоятельно.
 */
var OpenCommand = /** @class */ (function () {
    function OpenCommand(open) {
        this.open = open;
    }
    OpenCommand.prototype.execute = function () {
        console.log("Open new file: (".concat(this.open, ")"));
    };
    return OpenCommand;
}());
/**
 * Но есть и команды, которые делегируют более сложные операции другим объектам,
 * называемым «получателями».
 */
var PrintCommand = /** @class */ (function () {
    function PrintCommand(receiver) {
        this.receiver = receiver;
    }
    /**
     * Команды могут делегировать выполнение любым методам получателя.
     */
    PrintCommand.prototype.execute = function () {
        console.log('The print command passes execution to the receiver');
        this.receiver.openPrinterDialog();
        this.receiver.startPrinter();
    };
    return PrintCommand;
}());
/**
 * Классы Получателей содержат некую важную бизнес-логику. Они умеют выполнять
 * все виды операций, связанных с выполнением запроса. Фактически, любой класс
 * может выступать Получателем.
 */
var Receiver = /** @class */ (function () {
    function Receiver() {
    }
    Receiver.prototype.openPrinterDialog = function () {
        console.log("Receiver opens the printer dialog");
    };
    Receiver.prototype.startPrinter = function () {
        console.log("Receiver starts the printer");
    };
    return Receiver;
}());
/**
 * Отправитель связан с одной или несколькими командами. Он отправляет запрос
 * команде.
 */
var Invoker = /** @class */ (function () {
    function Invoker() {
    }
    /**
     * Инициализация команд.
     */
    Invoker.prototype.setOnStart = function (command) {
        this.onStart = command;
    };
    Invoker.prototype.setOnFinish = function (command) {
        this.onFinish = command;
    };
    /**
     * Отправитель не зависит от классов конкретных команд и получателей.
     * Отправитель передаёт запрос получателю косвенно, выполняя команду.
     */
    Invoker.prototype.testWork = function () {
        console.log('Start work');
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
        console.log('Finish work');
    };
    Invoker.prototype.isCommand = function (object) {
        return object.execute !== undefined;
    };
    return Invoker;
}());
/**
 * Клиентский код может параметризовать отправителя любыми командами.
 */
var invoker = new Invoker();
invoker.setOnStart(new OpenCommand('First message'));
var receiver = new Receiver();
invoker.setOnFinish(new PrintCommand(receiver));
invoker.testWork();
