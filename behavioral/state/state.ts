// позволяет менять объектам свое поведение в зависимости от состояния
// выглядит будто в работу включился другой класс

//Очень важным нюансом, отличающим этот паттерн от Стратегии, является то, 
// что и контекст, и сами конкретные состояния могут знать друг о друге и инициировать переходы от одного состояния к другому.

/**
 * Контекст хранит ссылку на экземпляр подкласса Состояния, который отображает текущее состояние Контекста.
 */

class Phone {
    /**
     * @type {State} Ссылка на текущее состояние Контекста.
     */
    private state!: State;

    constructor(state: State) {
        this.transitionTo(state);
    }

    /**
     * Контекст позволяет изменять объект Состояния во время выполнения.
     */
    public transitionTo(state: State): void {
        console.log(`Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setPhone(this);
    }

    /**
     * Контекст делегирует часть своего поведения текущему объекту Состояния.
     */
    public selectMenuItemRequest(): void {
        this.state.selectMenuItem();
    }

    public callrequest(): void {
        this.state.call();
    }

    public blockrequest(): void {
        this.state.block();
    }

    public dischargerequest(): void {
        this.state.discharge();
    }

    public chargerequest(): void {
        this.state.charge();
    }

    public unlockrequest(): void {
        this.state.unlock();
    }
}

/**
 * Базовый класс Состояния объявляет методы, которые должны реализовать все
 * Конкретные Состояния, а также предоставляет обратную ссылку на объект
 * Контекст, связанный с Состоянием. Эта обратная ссылка может использоваться
 * Состояниями для передачи Контекста другому Состоянию.
 */
abstract class State {
    protected phone!: Phone;

    public setPhone(phone: Phone) {
        this.phone = phone;
    }

    public abstract block(): void;

    public abstract selectMenuItem(): void;

    public abstract call(): void;

    public abstract discharge(): void;

    public abstract charge(): void;

    public abstract unlock(): void;
}

/**
 * Конкретные Состояния реализуют различные модели поведения, связанные с
 * состоянием Контекста.
 */
class UnlockState extends State {
    public block(): void {
        console.log('Blocking the phone');
        this.phone.transitionTo(new LockState());
    }

    public selectMenuItem(): void {
        console.log('Select menu item');
    }

    public call(): void {
        console.log('Calling a phone number');
    }

    public discharge(): void {
        console.log('Battery low');
        this.phone.transitionTo(new DischargeState());
    }

    public charge(): void {
        console.log('');
    }

    public unlock(): void {
        console.log('');
    }
}

class LockState extends State {
    public block(): void {
        console.log('');
    }

    public call(): void {
        console.log('You can not make a call when blocked');
    }

    public selectMenuItem(): void {
        console.log('You can not select menu item');
    }

    public unlock(): void {
        console.log('Unlock phone');
        this.phone.transitionTo(new UnlockState());
    }

    public discharge(): void {
        console.log('Battery low');
        this.phone.transitionTo(new DischargeState());
    }

    public charge(): void {
        console.log('');
    }
}

class DischargeState extends State {
    public block(): void {
        console.log('Blocking the phone');
        this.phone.transitionTo(new LockState());
    }

    public selectMenuItem(): void {
        console.log('You can not select menu item');
    }

    public call(): void {
        console.log('You can not call');
    }

    public charge(): void {
        console.log('Battery is charged');
        this.phone.transitionTo(new UnlockState());
    }

    public discharge(): void {
        console.log('');
    }

    public unlock(): void {
        console.log('');
    }
}

/**
 * Клиентский код.
 */
console.log('');
const phone = new Phone(new LockState());
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