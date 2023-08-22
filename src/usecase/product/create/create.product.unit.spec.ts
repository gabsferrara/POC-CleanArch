import CreateProductUsecase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Product a",
    price: 10,
}

const MockRespository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};


describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRespository();
        const productCreateUseCase = new CreateProductUsecase(productRepository);

        const output = await productCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });
});