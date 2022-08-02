// позволяет сгруппировать множество объектов в древовидную структуру, а затем работать с ней так, как будто это единичный объект.
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
var Products = /** @class */ (function () {
    function Products() {
    }
    Products.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    Products.prototype.getParent = function () {
        return this.parent;
    };
    Products.prototype.add = function (products) { };
    Products.prototype.remove = function (products) { };
    Products.prototype.isComposite = function () {
        return false;
    };
    return Products;
}());
var Cake = /** @class */ (function (_super) {
    __extends(Cake, _super);
    function Cake() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cake.prototype.cost = function () {
        return 'Cake cost';
    };
    return Cake;
}(Products));
var GiftBox = /** @class */ (function (_super) {
    __extends(GiftBox, _super);
    function GiftBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        return _this;
    }
    GiftBox.prototype.add = function (products) {
        this.children.push(products);
        products.setParent(this);
    };
    GiftBox.prototype.remove = function (products) {
        var productsIndex = this.children.indexOf(products);
        this.children.splice(productsIndex, 1);
        products.setParent(null);
    };
    GiftBox.prototype.isComposite = function () {
        return true;
    };
    GiftBox.prototype.cost = function () {
        var results = [];
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            results.push(child.cost());
        }
        return "Cost gift box (".concat(results.join('+'), ")");
    };
    return GiftBox;
}(Products));
function order(products) {
    console.log("Result: ".concat(products.cost()));
}
var cake = new Cake();
console.log('Client got a simple component:');
order(cake);
console.log('');
var tree = new GiftBox();
var branch1 = new GiftBox();
branch1.add(new Cake());
branch1.add(new Cake());
var branch2 = new Cake();
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
