// разделяет один или несколько классов на две отдельные иерархии — абстракцию и реализацию, 
// позволяя изменять их независимо друг от друга.

/**
 * Абстракция устанавливает интерфейс для «управляющей» части двух иерархий
 * классов. Она содержит ссылку на объект из иерархии Реализации и делегирует
 * ему всю настоящую работу.
 */
class GUI {
    protected api: API;

    constructor(api: API) {
        this.api = api;
    }

    public response(): string {
        const result = this.api.react();
        return `GUI interacts with:\n${result}`;
    }
}

/**
 * Можно расширить Абстракцию без изменения классов Реализации.
 */
class GUIadministrator extends GUI {
    public response(): string {
        const result = this.api.react();
        return `Admin GUI interacrs with:\n${result}`;
    }
}

/** интерфейс Реализации предоставляет только
 * примитивные операции, в то время как Абстракция определяет операции более
 * высокого уровня, основанные на этих примитивах.
 */
interface API {
    react(): string;
}

class APIwindows implements API {
    public react(): string {
        return 'Answer from API windows';
    }
}

class APImacOS implements API {
    public react(): string {
        return 'Answer from API macOS';
    }
}

function test(gui: GUI) {
    console.log(gui.response());
}

/**
 * Клиентский код должен работать с любой предварительно сконфигурированной
 * комбинацией абстракции и реализации.
 */
let api = new APIwindows();
let gui = new GUI(api);
test(gui);

console.log('');

api = new APImacOS();
gui = new GUIadministrator(api);
test(gui);