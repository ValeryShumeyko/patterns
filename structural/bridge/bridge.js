// разделяет один или несколько классов на две отдельные иерархии — абстракцию и реализацию, 
// позволяя изменять их независимо друг от друга.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Абстракция устанавливает интерфейс для «управляющей» части двух иерархий
 * классов. Она содержит ссылку на объект из иерархии Реализации и делегирует
 * ему всю настоящую работу.
 */
var GUI = /** @class */ (function () {
    function GUI(api) {
        this.api = api;
    }
    GUI.prototype.response = function () {
        var result = this.api.react();
        return "GUI interacts with:\n".concat(result);
    };
    return GUI;
}());
/**
 * Можно расширить Абстракцию без изменения классов Реализации.
 */
var GUIadministrator = /** @class */ (function (_super) {
    __extends(GUIadministrator, _super);
    function GUIadministrator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GUIadministrator.prototype.response = function () {
        var result = this.api.react();
        return "Admin GUI interacrs with:\n".concat(result);
    };
    return GUIadministrator;
}(GUI));
var APIwindows = /** @class */ (function () {
    function APIwindows() {
    }
    APIwindows.prototype.react = function () {
        return 'Answer from API windows';
    };
    return APIwindows;
}());
var APImacOS = /** @class */ (function () {
    function APImacOS() {
    }
    APImacOS.prototype.react = function () {
        return 'Answer from API macOS';
    };
    return APImacOS;
}());
function test(gui) {
    console.log(gui.response());
}
/**
 * Клиентский код должен работать с любой предварительно сконфигурированной
 * комбинацией абстракции и реализации.
 */
var api = new APIwindows();
var gui = new GUI(api);
test(gui);
console.log('');
api = new APImacOS();
gui = new GUIadministrator(api);
test(gui);
