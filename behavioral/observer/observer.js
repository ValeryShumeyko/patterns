// создает механизм подписки, позволяющий одним объектам следить за изменениями других объектов
/**
 * Издатель владеет некоторым важным состоянием и оповещает наблюдателей о его
 * изменениях.
 */
var TelegramChannel = /** @class */ (function () {
    function TelegramChannel() {
        /**
         * @type {Subscriber[]} Список подписчиков. В реальной жизни список
         * подписчиков может храниться в более подробном виде (классифицируется по
         * типу события и т.д.)
         */
        this.subscribers = [];
    }
    /**
     * Методы управления подпиской.
     */
    TelegramChannel.prototype.subscribe = function (subscriber) {
        console.log('Subscribed an observer.');
        this.subscribers.push(subscriber);
    };
    TelegramChannel.prototype.unsubscribe = function (subscriber) {
        var observerIndex = this.subscribers.indexOf(subscriber);
        if (observerIndex === -1) {
            return console.log('Nonexistent observer.');
        }
        this.subscribers.splice(observerIndex, 1);
        console.log('Unsubscribed an observer.');
    };
    /**
     * Запуск обновления в каждом подписчике.
     */
    TelegramChannel.prototype.notify = function () {
        console.log('Notifying observers...');
        for (var _i = 0, _a = this.subscribers; _i < _a.length; _i++) {
            var subscriber = _a[_i];
            subscriber.update(this);
        }
    };
    TelegramChannel.prototype.publishPost = function () {
        console.log('New post added');
        this.notify();
    };
    return TelegramChannel;
}());
/**
 * Конкретные Наблюдатели реагируют на обновления, выпущенные Издателем, к
 * которому они прикреплены.
 */
var WomanSubscriber = /** @class */ (function () {
    function WomanSubscriber() {
    }
    WomanSubscriber.prototype.update = function (channel) {
        console.log('Woman Subscriber: Updates received');
    };
    return WomanSubscriber;
}());
var ManSubscriber = /** @class */ (function () {
    function ManSubscriber() {
    }
    ManSubscriber.prototype.update = function (channel) {
        console.log('Man Subscriber: Updates received');
    };
    return ManSubscriber;
}());
/**
 * Клиентский код.
 */
console.log('');
var telegramChannel = new TelegramChannel();
telegramChannel.publishPost();
console.log('');
var Ann = new WomanSubscriber();
telegramChannel.subscribe(Ann);
var Nick = new ManSubscriber();
telegramChannel.subscribe(Nick);
console.log('');
telegramChannel.publishPost();
console.log('');
telegramChannel.unsubscribe(Nick);
telegramChannel.publishPost();
