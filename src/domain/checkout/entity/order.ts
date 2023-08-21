import OrderItem from "./order_item";

export default class Order {
    
    private _id: string;
    private _customerId: string; //diferentes agregado
    private _items: OrderItem[] = []; //mesmo agregado
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    total(): number {
        return this._items.reduce((acc,item) => acc + item.orderItemTotal(), 0)
    }

    changeItems(items: OrderItem[]): void {
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    changeCustomer(customer_id: string){
        this._customerId = customer_id;
        this.validate();
    }

    validate(): boolean {
        if(this._id.length === 0) {
            throw new Error("Id is required");
        }
        if(this._customerId.length === 0) {
            throw new Error("customerId is required");
        }
        if(this._items.length === 0) {
            throw new Error("Item are required");
        }
        if(this._items.some(item => item.quantity <= 0)){
            throw new Error("Item qnt must be greater than 0"); 
        }
        return true
    }
}