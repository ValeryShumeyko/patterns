// позволяет уменьшить связанность классов между собой, вынося межклассовые связи в класс-посредник
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
var FormMediator = /** @class */ (function () {
    function FormMediator(countrySelect, citySelect, submitButton) {
        this.countrySelect = countrySelect;
        this.countrySelect.setMediator(this);
        this.citySelect = citySelect;
        this.citySelect.setMediator(this);
        this.submitButton = submitButton;
        this.submitButton.setMediator(this);
    }
    FormMediator.prototype.notify = function (sender, event) {
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
    };
    return FormMediator;
}());
/**
 * Базовый Компонент обеспечивает базовую функциональность хранения экземпляра
 * посредника внутри объектов компонентов.
 */
var BaseComponent = /** @class */ (function () {
    function BaseComponent(mediator) {
        this.mediator = mediator;
    }
    BaseComponent.prototype.setMediator = function (mediator) {
        this.mediator = mediator;
    };
    return BaseComponent;
}());
/**
 * Конкретные Компоненты реализуют различную функциональность. Они не зависят от
 * других компонентов. Они также не зависят от каких-либо конкретных классов
 * посредников.
 */
var CountrySelect = /** @class */ (function (_super) {
    __extends(CountrySelect, _super);
    function CountrySelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CountrySelect.prototype.openCountrySelect = function () {
        console.log('Choose country');
        this.mediator.notify(this, 'clickCountrySelect');
    };
    CountrySelect.prototype.closeCountrySelect = function () {
        console.log('Close country select');
        this.mediator.notify(this, 'closeCountrySelect');
    };
    return CountrySelect;
}(BaseComponent));
var CitySelect = /** @class */ (function (_super) {
    __extends(CitySelect, _super);
    function CitySelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CitySelect.prototype.openCitySelect = function () {
        console.log('Choose city');
        this.mediator.notify(this, 'clickCitySelect');
    };
    CitySelect.prototype.closeCitySelect = function () {
        console.log('Close city select');
        this.mediator.notify(this, 'closeCitySelect');
    };
    return CitySelect;
}(BaseComponent));
var SubmitButton = /** @class */ (function (_super) {
    __extends(SubmitButton, _super);
    function SubmitButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubmitButton.prototype.submit = function () {
        console.log('Submit form');
        this.mediator.notify(this, 'submit');
    };
    return SubmitButton;
}(BaseComponent));
/**
 * Клиентский код.
 */
var countrySelect = new CountrySelect();
var citySelect = new CitySelect();
var submitButton = new SubmitButton();
var mediator = new FormMediator(countrySelect, citySelect, submitButton);
console.log('Client wants open country select');
countrySelect.openCountrySelect();
