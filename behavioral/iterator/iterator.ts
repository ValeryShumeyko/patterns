// дает возможность последовательно обходить элементы составных объектов, не раскрывая их внутреннее представление

interface Iterator<T> {
    // Возврат текущего элемента.
    current(): T;

    // Возврат текущего элемента и переход к следующему элементу.
    next(): T;

    // Возврат ключа текущего элемента.
    key(): number;

    // Проверяет корректность текущей позиции.
    valid(): boolean;
}

interface Aggregator {
    // Получить внешний итератор.
    getIterator(): Iterator<string>;
}

class NumbersIterator implements Iterator<string> {
    private collection: NumbersCollection;

    private position: number = 0;

    /**
     * Эта переменная указывает направление обхода.
     */
    private reverse: boolean = false;

    constructor(collection: NumbersCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public current(): string {
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

class NumbersCollection implements Aggregator {
    private items: string[] = [];

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public getIterator(): Iterator<string> {
        return new NumbersIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
        return new NumbersIterator(this, true);
    }
}


const collection = new NumbersCollection();
collection.addItem('1');
collection.addItem('2');
collection.addItem('3');
collection.addItem('4');

const iterator = collection.getIterator();

console.log('Iterate elements in direct order:');
while (iterator.valid()) {
    console.log(iterator.next());
}

console.log('');
console.log('Iterate elements in reverse order:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}