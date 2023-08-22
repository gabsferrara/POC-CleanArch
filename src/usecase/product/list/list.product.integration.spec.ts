import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUsecase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should list a products", async () => {

        const productRepository = new ProductRepository();
        const useCaseCreate = new CreateProductUsecase(productRepository)
        const usecase = new ListProductUseCase(productRepository)

        const product0 = await useCaseCreate.execute({type:"a", name: "John", price: 50,})
        const product1 = await useCaseCreate.execute({type:"a", name: "Jane", price: 100,})
                
        const result = await usecase.execute({});

        expect(result.products.length).toBe(2);
        expect(result.products[0]).toEqual(product0);
        expect(result.products[1]).toEqual(product1);
    })

})