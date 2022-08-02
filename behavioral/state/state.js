// позволяет менять объектам свое поведение в зависимости от состояния
// выглядит будто в работу включился другой класс
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
//Очень важным нюансом, отличающим этот паттерн от Стратегии, является то, 
// что и контекст, и сами конкретные состояния могут знать друг о друге и инициировать переходы от одного состояния к другому.
/**
 * Контекст хранит ссылку на экземпляр подкласса Состояния, который отображает текущее состояние Контекста.
 */
var Phone = /** @class */ (function () {
    function Phone(state) {
        this.transitionTo(state);
    }
    /**
     * Контекст позволяет изменять объект Состояния во время выполнения.
     */
    Phone.prototype.transitionTo = function (state) {
        console.log("Transition to ".concat(state.constructor.name, "."));
        this.state = state;
        this.state.setPhone(this);
    };
    /**
     * Контекст делегирует часть своего поведения текущему объекту Состояния.
     */
    Phone.prototype.selectMenuItemRequest = function () {
        this.state.selectMenuItem();
    };
    Phone.prototype.callrequest = function () {
        this.state.call();
    };
    Phone.prototype.blockrequest = function () {
        this.state.block();
    };
    Phone.prototype.dischargerequest = function () {
        this.state.discharge();
    };
    Phone.prototype.chargerequest = function () {
        this.state.charge();
    };
    Phone.prototype.unlockrequest = function () {
        this.state.unlock();
    };
    return Phone;
}());
/**
 * Базовый класс Состояния объявляет методы, которые должны реализовать все
 * Конкретные Состояния, а также предоставляет обратную ссылку на объект
 * Контекст, связанный с Состоянием. Эта обратная ссылка может использоваться
 * Состояниями для передачи Контекста другому Состоянию.
 */
var State = /** @class */ (function () {
    function State() {
    }
    State.prototype.setPhone = function (phone) {
        this.phone = phone;
    };
    return State;
}());
/**
 * Конкретные Состояния реализуют различные модели поведения, связанные с
 * состоянием Контекста.
 */
var UnlockState = /** @class */ (function (_super) {
    __extends(UnlockState, _super);
    function UnlockState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnlockState.prototype.block = function () {
        console.log('Blocking the phone');
        this.phone.transitionTo(new LockState());
    };
    UnlockState.prototype.selectMenuItem = function () {
        console.log('Select menu item');
    };
    UnlockState.prototype.call = function () {
        console.log('Calling a phone number');
    };
    UnlockState.prototype.discharge = function () {
        console.log('Battery low');
        this.phone.transitionTo(new DischargeState());
    };
    UnlockState.prototype.charge = function () {
        console.log('');
    };
    UnlockState.prototype.unlock = function () {
        console.log('');
    };
    return UnlockState;
}(State));
var LockState = /** @class */ (function (_super) {
    __extends(LockState, _super);
    function LockState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LockState.prototype.block = function () {
        console.log('');
    };
    LockState.prototype.call = function () {
        console.log('You can not make a call when blocked');
    };
    LockState.prototype.selectMenuItem = function () {
        console.log('You can not select menu item');
    };
    LockState.prototype.unlock = function () {
        console.log('Unlock phone');
        this.phone.transitionTo(new UnlockState());
    };
    LockState.prototype.discharge = function () {
        console.log('Battery low');
        this.phone.transitionTo(new DischargeState());
    };
    LockState.prototype.charge = function () {
        console.log('');
    };
    return LockState;
}(State));
var DischargeState = /** @class */ (function (_super) {
    __extends(DischargeState, _super);
    function DischargeState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DischargeState.prototype.block = function () {
        console.log('Blocking the phone');
        this.phone.transitionTo(new LockState());
    };
    DischargeState.prototype.selectMenuItem = function () {
        console.log('You can not select menu item');
    };
    DischargeState.prototype.call = function () {
        console.log('You can not call');
    };
    DischargeState.prototype.charge = function () {
        console.log('Battery is charged');
        this.phone.transitionTo(new UnlockState());
    };
    DischargeState.prototype.discharge = function () {
        console.log('');
    };
    DischargeState.prototype.unlock = function () {
        console.log('');
    };
    return DischargeState;
}(State));
/**
 * Клиентский код.
 */
console.log('');
var phone = new Phone(new LockState());
phone.callrequest();
phone.selectMenuItemRequest();
console.log('');
phone.unlockrequest();
phone.callrequest();
phone.selectMenuItemRequest();
console.log('');
phone.blockrequest();
phone.dischargerequest();
phone.callrequest();
console.log('');
phone.chargerequest();
