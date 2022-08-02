// позволяет сгруппировать множество объектов в древовидную структуру, а затем работать с ней так, как будто это единичный объект.

abstract class Products {
    protected parent!: Products | null;

    public setParent(parent: Products | null) {
        this.parent = parent;
    }

    public getParent(): Products | null {
        return this.parent;
    }

    public add(products: Products): void { }

    public remove(products: Products): void { }

    public isComposite(): boolean {
        return false;
    }

    public abstract cost(): string;
}

class Cake extends Products {
    public cost(): string {
        return 'Cake cost';
    }
}

class GiftBox extends Products {
    protected children: Products[] = [];

    public add(products: Products): void {
        this.children.push(products);
        products.setParent(this);
    }

    public remove(products: Products): void {
        const productsIndex = this.children.indexOf(products);
        this.children.splice(productsIndex, 1);

        products.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    public cost(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.cost());
        }

        return `Cost gift box (${results.join('+')})`;
    }
}

function order(products: Products) {
    console.log(`Result: ${products.cost()}`);
}

const cake = new Cake();
console.log('Client got a simple component:');
order(cake);
console.log('');

const tree = new GiftBox();
const branch1 = new GiftBox();
branch1.add(new Cake());
branch1.add(new Cake());
const branch2 = new Cake();
branch2.add(new Cake());
tree.add(branch1);
tree.add(branch2);
console.log('Client got a composite tree:');
order(tree);
console.log('');

//function clientCode2(component1: Products, component2: Products) {
    // ...

   // if (component1.isComposite()) {
      //  component1.add(component2);
  //  }
  //  console.log(`RESULT: ${component1.cost()}`);

    // ...
//}

//console.log('Client: I don\'t need to check the components classes even when managing the tree:');
//clientCode2(tree, simple);