import Address from "../value-object/adress";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("should crete a customer", () => {
        let customer = CustomerFactory.create("John");;

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();

    });

    it("should crete a customer with an address", () => {
        const address = new Address("Rua xxx", 1, "12345", "São Paulo")
        let customer = CustomerFactory.createWithAddress("John", address);;

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);

    });

})