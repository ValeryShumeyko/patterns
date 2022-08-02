// позволяет уменьшить связанность классов между собой, вынося межклассовые связи в класс-посредник

/**
 * Интерфейс Посредника предоставляет метод, используемый компонентами для
 * уведомления посредника о различных событиях. Посредник может реагировать на
 * эти события и передавать исполнение другим компонентам.
 */
interface Mediator {
    notify(sender: object, event: string): void;
}

class FormMediator implements Mediator {

    private countrySelect: CountrySelect;
    private citySelect: CitySelect;
    private submitButton: SubmitButton;

    constructor(countrySelect: CountrySelect, citySelect: CitySelect, submitButton: SubmitButton) {
        this.countrySelect = countrySelect;
        this.countrySelect.setMediator(this);
        this.citySelect = citySelect;
        this.citySelect.setMediator(this);
        this.submitButton = submitButton;
        this.submitButton.setMediator(this);
    }

    public notify(sender: object, event: string): void {
        if (event === 'clickCountrySelect') {
            console.log('Mediator helps open select and choose country');
            this.countrySelect.closeCountrySelect();
            this.citySelect.openCitySelect();
        }

        if (event === 'clickCitySelect') {
            console.log('Mediator helps open select and choose city');
            this.citySelect.closeCitySelect();
            this.submitButton.submit();
        }
    }
}

/**
 * Базовый Компонент обеспечивает базовую функциональность хранения экземпляра
 * посредника внутри объектов компонентов.
 */
class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator?: Mediator) {
        this.mediator = mediator!;
    }

    public setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }
}

/**
 * Конкретные Компоненты реализуют различную функциональность. Они не зависят от
 * других компонентов. Они также не зависят от каких-либо конкретных классов
 * посредников.
 */
class CountrySelect extends BaseComponent {
    public openCountrySelect(): void {
        console.log('Choose country');
        this.mediator.notify(this, 'clickCountrySelect');
    }

    public closeCountrySelect(): void {
        console.log('Close country select');
        this.mediator.notify(this, 'closeCountrySelect');
    }
}

class CitySelect extends BaseComponent {
    public openCitySelect(): void {
        console.log('Choose city');
        this.mediator.notify(this, 'clickCitySelect');
    }

    public closeCitySelect(): void {
        console.log('Close city select');
        this.mediator.notify(this, 'closeCitySelect');
    }
}

class SubmitButton extends BaseComponent {
    public submit(): void {
        console.log('Submit form');
        this.mediator.notify(this, 'submit');
    }
}

/**
 * Клиентский код.
 */
const countrySelect = new CountrySelect();
const citySelect = new CitySelect();
const submitButton = new SubmitButton();

const mediator = new FormMediator(countrySelect, citySelect, submitButton);

console.log('Client wants open country select');
countrySelect.openCountrySelect();

