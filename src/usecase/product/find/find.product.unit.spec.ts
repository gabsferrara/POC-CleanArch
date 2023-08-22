import FindProductUseCase from "./find.product.usecase";

const input = {
    id: "123"
}

const productOutput = {
    id: "123",
    name: "Product a",
    price: 10,
}

const MockRespository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(productOutput)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test find a product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRespository();
        const productFindUseCase = new FindProductUseCase(productRepository);
        const output = await productFindUseCase.execute(input)

        expect(output).toEqual(productOutput);
    });
});