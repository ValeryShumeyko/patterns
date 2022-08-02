// позволяет передавать запросы последовательно по цепочке обработчиков
// каждый следующий обработчик решает, может ли он обработать запрос, либо его нужно передать дальше по цепочке

interface Handler {
    setNext(handler: Handler): Handler;

    handle(request: string): string;
}

/**
 * Поведение цепочки по умолчанию может быть реализовано внутри базового класса
 * обработчика.
 */
abstract class BaseHandler implements Handler {
    private nextHandler!: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        } else {
            return null;
        }
    }
}

class EngineerHandler extends BaseHandler {
    public handle(request: string): string {
        if (request === 'question about engineering') {
            return `Engineer can answer the ${request}.`;
        }
        return super.handle(request);

    }
}

class BuilderHandler extends BaseHandler {
    public handle(request: string): string {
        if (request === 'building question') {
            return `Builder can answer the ${request}.`;
        }
        return super.handle(request);
    }
}

class DoctorHandler extends BaseHandler {
    public handle(request: string): string {
        if (request === 'question about medicine') {
            return `Doctor can answer the ${request}.`;
        }
        return super.handle(request);
    }
}

function test(handler: Handler) {
    const questions = ['question about engineering', 'building question', 'question about medicine', 'question about cook'];

    for (const question of questions) {
        console.log(`Who answer the ${question}?`);

        const result = handler.handle(question);
        if (result) {
            console.log(`  ${result}`);
        } else {
            console.log(`  ${question} was left untouched.`);
        }
    }
}

const engineer = new EngineerHandler();
const builder = new BuilderHandler();
const doctor = new DoctorHandler();

engineer.setNext(builder).setNext(doctor);


test(engineer);
