// добавляет новую функциональность уже существующим классам, не изменяя исходный код классов

/**
 * Интерфейс Компонента объявляет метод accept, который в качестве аргумента
 * может получать любой объект, реализующий интерфейс посетителя.
 */
interface Shape {
    accept(visitor: Visitor): void;
}

/**
 * Каждый Конкретный Компонент должен реализовать метод accept таким образом,
 * чтобы он вызывал метод посетителя, соответствующий классу компонента.
 */
class Circle implements Shape {
    //позволяем посетителю узнать, с каким классом компонента он работает.

    public accept(visitor: Visitor): void {
        visitor.visitCircle(this);
    }
}

class Rectangle implements Shape {

    public accept(visitor: Visitor): void {
        visitor.visitRectangle(this);
    }
}

class Line implements Shape {

    public accept(visitor: Visitor): void {
        visitor.visitLine(this);
    }
}

interface Visitor {
    visitCircle(element: Circle): void;
    visitRectangle(element: Rectangle): void;
    visitLine(element: Line): void;
}


class GetCoordinatesVisitor implements Visitor {
    public visitCircle(element: Circle): void {
        console.log(`Get the coordinates of the center of the circle and the radius of the circle.`);
    }

    public visitRectangle(element: Rectangle): void {
        console.log(`Get the length of the short and long sides of the rectangle`);
    }

    public visitLine(element: Line): void {
        console.log(`Get the length of the line`);
    }
}

function test(shapes: Shape[], visitor: Visitor) {
    // ...
    for (const shape of shapes) {
        shape.accept(visitor);
    }
    // ...
}

const shapes = [
    new Circle(),
    new Rectangle(),
    new Line(),
];

console.log('Get the coordinates of all shapes:');
const visitor = new GetCoordinatesVisitor();
test(shapes, visitor);

