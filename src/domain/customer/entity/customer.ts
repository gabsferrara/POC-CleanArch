import Address from "../value-object/adress";

export default class Customer {


    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get id(): string{
        return this._id;
    }

    get Address(): Address{
        return this._address
    }

    validate() {
        if(this._id.length === 0) {
            throw new Error("Id is required")
        }
        if(this._name.length === 0) {
            throw new Error("Name is required")
        }
    }
    
    changeName(name:string) { //diferente de set name, isso é uma regra de negocio, inteção de que o sistema tem. Na pratica, nesse caso, é a mesma coisa.
        this._name = name
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    activate() {
        if(this._address === undefined ) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address;
    }

    isActive(): boolean {
        return this._active;
    }


    get rewardPoints(): number {
        return this._rewardPoints;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

}



