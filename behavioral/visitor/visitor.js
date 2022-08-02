// добавляет новую функциональность уже существующим классам, не изменяя исходный код классов
/**
 * Каждый Конкретный Компонент должен реализовать метод accept таким образом,
 * чтобы он вызывал метод посетителя, соответствующий классу компонента.
 */
var Circle = /** @class */ (function () {
    function Circle() {
    }
    //позволяем посетителю узнать, с каким классом компонента он работает.
    Circle.prototype.accept = function (visitor) {
        visitor.visitCircle(this);
    };
    return Circle;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle() {
    }
    Rectangle.prototype.accept = function (visitor) {
        visitor.visitRectangle(this);
    };
    return Rectangle;
}());
var Line = /** @class */ (function () {
    function Line() {
    }
    Line.prototype.accept = function (visitor) {
        visitor.visitLine(this);
    };
    return Line;
}());
var GetCoordinatesVisitor = /** @class */ (function () {
    function GetCoordinatesVisitor() {
    }
    GetCoordinatesVisitor.prototype.visitCircle = function (element) {
        console.log("Get the coordinates of the center of the circle and the radius of the circle.");
    };
    GetCoordinatesVisitor.prototype.visitRectangle = function (element) {
        console.log("Get the length of the short and long sides of the rectangle");
    };
    GetCoordinatesVisitor.prototype.visitLine = function (element) {
        console.log("Get the length of the line");
    };
    return GetCoordinatesVisitor;
}());
function test(shapes, visitor) {
    // ...
    for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
        var shape = shapes_1[_i];
        shape.accept(visitor);
    }
    // ...
}
var shapes = [
    new Circle(),
    new Rectangle(),
    new Line(),
];
console.log('Get the coordinates of all shapes:');
var visitor = new GetCoordinatesVisitor();
test(shapes, visitor);
