// создает механизм подписки, позволяющий одним объектам следить за изменениями других объектов

//Когда после изменения состояния одного объекта требуется что-то сделать в других, 
// но вы не знаете наперёд, какие именно объекты должны отреагировать.

// Цель Посредника — убрать обоюдные зависимости между компонентами системы. 
// Вместо этого они становятся зависимыми от самого посредника. С другой стороны, цель Наблюдателя — 
// обеспечить динамическую одностороннюю связь, в которой одни объекты косвенно зависят от других.

/**
 * Интерфейс издателя объявляет набор методов для управлениями подписчиками.
 */
interface Channel {
    // Присоединяет наблюдателя к издателю.
    subscribe(subscriber: Subscriber): void;

    // Отсоединяет наблюдателя от издателя.
    unsubscribe(subscriber: Subscriber): void;

    // Уведомляет всех наблюдателей о событии.
    notify(): void;
}

/**
 * Издатель владеет некоторым важным состоянием и оповещает наблюдателей о его
 * изменениях.
 */
class TelegramChannel implements Channel {
    /**
     * @type {Subscriber[]} Список подписчиков. В реальной жизни список
     * подписчиков может храниться в более подробном виде (классифицируется по
     * типу события и т.д.)
     */
    private subscribers: Subscriber[] = [];

    /**
     * Методы управления подпиской.
     */
    public subscribe(subscriber: Subscriber): void {
        console.log('Subscribed an observer.');
        this.subscribers.push(subscriber);
    }

    public unsubscribe(subscriber: Subscriber): void {
        const observerIndex = this.subscribers.indexOf(subscriber);
        if (observerIndex === -1) {
            return console.log('Nonexistent observer.');
        }

        this.subscribers.splice(observerIndex, 1);
        console.log('Unsubscribed an observer.');
    }

    /**
     * Запуск обновления в каждом подписчике.
     */
    public notify(): void {
        console.log('Notifying observers...');
        for (const subscriber of this.subscribers) {
            subscriber.update(this);
        }
    }

    public publishPost(): void {
        console.log('New post added');
        this.notify();
    }
}

/**
 * Интерфейс Наблюдателя объявляет метод уведомления, который издатели
 * используют для оповещения своих подписчиков.
 */
interface Subscriber {
    // Получить обновление от субъекта.
    update(channel: Channel): void;
}

/**
 * Конкретные Наблюдатели реагируют на обновления, выпущенные Издателем, к
 * которому они прикреплены.
 */
class WomanSubscriber implements Subscriber {
    public update(channel: Channel): void {
        console.log('Woman Subscriber: Updates received');
    }
}

class ManSubscriber implements Subscriber {
    public update(channel: Channel): void {
        console.log('Man Subscriber: Updates received');
    }
}

/**
 * Клиентский код.
 */
console.log('');
const telegramChannel = new TelegramChannel();
telegramChannel.publishPost();

console.log('');
const Ann = new WomanSubscriber();
telegramChannel.subscribe(Ann);
const Nick = new ManSubscriber();
telegramChannel.subscribe(Nick);

console.log('');
telegramChannel.publishPost();

console.log('');
telegramChannel.unsubscribe(Nick);
telegramChannel.publishPost();
