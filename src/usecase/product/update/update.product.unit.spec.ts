import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";



const product = ProductFactory.create("a", "Product 1", 25);

const input = {
    id: product.id,
    name: "Product Updated",
    price: 100,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    }
}

describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateProductUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input)

        expect(output).toEqual(input)
    })
})