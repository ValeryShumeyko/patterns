// дает возможность последовательно обходить элементы составных объектов, не раскрывая их внутреннее представление
var NumbersIterator = /** @class */ (function () {
    function NumbersIterator(collection, reverse) {
        if (reverse === void 0) { reverse = false; }
        this.position = 0;
        /**
         * Эта переменная указывает направление обхода.
         */
        this.reverse = false;
        this.collection = collection;
        this.reverse = reverse;
        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }
    NumbersIterator.prototype.current = function () {
        return this.collection.getItems()[this.position];
    };
    NumbersIterator.prototype.key = function () {
        return this.position;
    };
    NumbersIterator.prototype.next = function () {
        var item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    };
    NumbersIterator.prototype.valid = function () {
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.getCount();
    };
    return NumbersIterator;
}());
var NumbersCollection = /** @class */ (function () {
    function NumbersCollection() {
        this.items = [];
    }
    NumbersCollection.prototype.getItems = function () {
        return this.items;
    };
    NumbersCollection.prototype.getCount = function () {
        return this.items.length;
    };
    NumbersCollection.prototype.addItem = function (item) {
        this.items.push(item);
    };
    NumbersCollection.prototype.getIterator = function () {
        return new NumbersIterator(this);
    };
    NumbersCollection.prototype.getReverseIterator = function () {
        return new NumbersIterator(this, true);
    };
    return NumbersCollection;
}());
var collection = new NumbersCollection();
collection.addItem('1');
collection.addItem('2');
collection.addItem('3');
collection.addItem('4');
var iterator = collection.getIterator();
console.log('Iterate elements in direct order:');
while (iterator.valid()) {
    console.log(iterator.next());
}
console.log('');
console.log('Iterate elements in reverse order:');
var reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}
