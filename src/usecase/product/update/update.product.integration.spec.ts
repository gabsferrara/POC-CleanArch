import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUsecase from "../create/create.product.usecase";


describe("Test create product use case", () => {

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

     it("should create a customer", async () => {

        const productRepository = new ProductRepository();
        const useCaseCreate = new CreateProductUsecase(productRepository)
        const usecase = new UpdateProductUseCase(productRepository)

        const inputOld = await useCaseCreate.execute({type:"a", name: "John", price: 50,})

        const inputUpdate = {
            id:inputOld.id,
            name: "Product Update",
            price: 250
        }
                
        const result = await usecase.execute(inputUpdate);

        expect(result).toEqual(inputUpdate);

    })

})