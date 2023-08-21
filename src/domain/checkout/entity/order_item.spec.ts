import OrderItem from "./order_item";

describe("Order unit test", () => {

    it("should throw error if the item quantity is less or equal than 0", () => {
        expect(() => {{
            const item = new OrderItem("1","Item 1", 100, "p1", 0);
        }}).toThrowError("Quantity must be grater than 0")
    })
    
})