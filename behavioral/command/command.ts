// помогает инкапсулировать некоторые действия и необходимые для них данные
// позволяет отделить клиента от получателя, превращает запросы в объекты, что позволяет передавать их как аргументы в методы

/**
 * Интерфейс Команды объявляет метод для выполнения команд.
 */
interface Command {
    execute(): void;
}

/**
 * Некоторые команды способны выполнять простые операции самостоятельно.
 */
class OpenCommand implements Command {
    private open: string;

    constructor(open: string) {
        this.open = open;
    }

    public execute(): void {
        console.log(`Open new file: (${this.open})`);
    }
}
/**
 * Но есть и команды, которые делегируют более сложные операции другим объектам,
 * называемым «получателями».
 */
class PrintCommand implements Command {
    private receiver!: Receiver;

    constructor(receiver: Receiver) {
        this.receiver = receiver;
    }
    /**
     * Команды могут делегировать выполнение любым методам получателя.
     */
    public execute(): void {
        console.log('The print command passes execution to the receiver');
        this.receiver.openPrinterDialog();
        this.receiver.startPrinter();
    }
}

/**
 * Классы Получателей содержат некую важную бизнес-логику. Они умеют выполнять
 * все виды операций, связанных с выполнением запроса. Фактически, любой класс
 * может выступать Получателем.
 */
class Receiver {
    public openPrinterDialog(): void {
        console.log(`Receiver opens the printer dialog`);
    }

    public startPrinter(): void {
        console.log(`Receiver starts the printer`);
    }
}

/**
 * Отправитель связан с одной или несколькими командами. Он отправляет запрос
 * команде.
 */
class Invoker {
    private onStart!: Command;

    private onFinish!: Command;

    /**
     * Инициализация команд.
     */
    public setOnStart(command: Command): void {
        this.onStart = command;
    }

    public setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    /**
     * Отправитель не зависит от классов конкретных команд и получателей.
     * Отправитель передаёт запрос получателю косвенно, выполняя команду.
     */
    public testWork(): void {
        console.log('Start work');
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }

        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
        console.log('Finish work');
    }

    private isCommand(object: any): object is Command {
        return object.execute !== undefined;
    }
}

/**
 * Клиентский код может параметризовать отправителя любыми командами.
 */
const invoker = new Invoker();
invoker.setOnStart(new OpenCommand('First message'));
const receiver = new Receiver();
invoker.setOnFinish(new PrintCommand(receiver));

invoker.testWork();