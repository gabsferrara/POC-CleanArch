import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product0 = ProductFactory.create("a","Product 0", 25);
const product1 = ProductFactory.create("a","Product 1", 50);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product0, product1])),
    }
}

describe("Unit test for listing Product use case", () => {
    it("should list a Product",async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);

        const output = await useCase.execute({});
        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product0.id)
        expect(output.products[0].name).toBe(product0.name)
        expect(output.products[0].price).toBe(product0.price)
        expect(output.products[1].id).toBe(product1.id)
        expect(output.products[1].name).toBe(product1.name)
        expect(output.products[1].price).toBe(product1.price)
        

    })
})
   