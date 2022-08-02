// позволяет передавать запросы последовательно по цепочке обработчиков
// каждый следующий обработчик решает, может ли он обработать запрос, либо его нужно передать дальше по цепочке
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
 * Поведение цепочки по умолчанию может быть реализовано внутри базового класса
 * обработчика.
 */
var BaseHandler = /** @class */ (function () {
    function BaseHandler() {
    }
    BaseHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        return handler;
    };
    BaseHandler.prototype.handle = function (request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        else {
            return null;
        }
    };
    return BaseHandler;
}());
var EngineerHandler = /** @class */ (function (_super) {
    __extends(EngineerHandler, _super);
    function EngineerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EngineerHandler.prototype.handle = function (request) {
        if (request === 'question about engineering') {
            return "Engineer can answer the ".concat(request, ".");
        }
        return _super.prototype.handle.call(this, request);
    };
    return EngineerHandler;
}(BaseHandler));
var BuilderHandler = /** @class */ (function (_super) {
    __extends(BuilderHandler, _super);
    function BuilderHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuilderHandler.prototype.handle = function (request) {
        if (request === 'building question') {
            return "Builder can answer the ".concat(request, ".");
        }
        return _super.prototype.handle.call(this, request);
    };
    return BuilderHandler;
}(BaseHandler));
var DoctorHandler = /** @class */ (function (_super) {
    __extends(DoctorHandler, _super);
    function DoctorHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoctorHandler.prototype.handle = function (request) {
        if (request === 'question about medicine') {
            return "Doctor can answer the ".concat(request, ".");
        }
        return _super.prototype.handle.call(this, request);
    };
    return DoctorHandler;
}(BaseHandler));
function test(handler) {
    var questions = ['question about engineering', 'building question', 'question about medicine', 'question about cook'];
    for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
        var question = questions_1[_i];
        console.log("Who answer the ".concat(question, "?"));
        var result = handler.handle(question);
        if (result) {
            console.log("  ".concat(result));
        }
        else {
            console.log("  ".concat(question, " was left untouched."));
        }
    }
}
var engineer = new EngineerHandler();
var builder = new BuilderHandler();
var doctor = new DoctorHandler();
engineer.setNext(builder).setNext(doctor);
test(engineer);
