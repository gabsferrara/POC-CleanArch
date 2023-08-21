export default class Address{

    // nao tem getter e setter, assim tem que criar um novo obj de valor p muda-lo

    _street: string;
    _number: number = 0;
    _zip: string = "";
    _city: string = "";

    constructor(street: string, number: number, zip: string, city: string){
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    validate() {
        if(this._street.length === 0){
            throw new Error("Street is required.");
        }
        if(this._number === 0){
            throw new Error("Number is required");
        }
        if(this._zip.length === 0){
            throw new Error("Zip is required.");
        }
        if(this._city.length === 0){
            throw new Error("City is required.");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`
    }
    toStringWithOutCity() {
        return `${this._street}, ${this._number}, ${this._zip}`
    }

    get street(): string{
        return this._street;
    }
    get number(): number{
        return this._number;
    }
    get city(): string{
        return this._city;
    }
    get zip(): string{
        return this._zip;
    }
}