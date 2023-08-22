import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import CreateProductUsecase from "../create/create.product.usecase";

describe("Test find product use case", () => {

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

     it("should find a product", async () => {

        const productRepository = new ProductRepository();
        const useCaseCreate = new CreateProductUsecase(productRepository)
        const usecase = new FindProductUseCase(productRepository)

        const output = await useCaseCreate.execute({type:"a", name: "John", price: 50,})

        const input = {
            id: output.id
        }
                
        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    })

})