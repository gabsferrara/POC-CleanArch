import CreateProductUsecase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import {app, sequelize} from '../express';
import request from 'supertest';

describe("2E2 test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it('shold create a product', async () => {
        const response = await request(app)
        .post("/product")
        .send({
            type: "a",
            name: "Product Test",
            price: 50,
        })

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product Test");
        expect(response.body.price).toBe(50);
    })

    it('should not create a customer', async () => {
        const response = await request(app)
        .post("/product")
        .send({
            type: "errado" ,
        })

        expect(response.status).toBe(500);
    })

    it('should list all product', async () => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUsecase(productRepository)
        

        const input = {
            type:"a",
            name: "Product 1",
            price: 150
        }
        
        const input2 = {
            type:"a",
            name: "Product 2",
            price: 250
        }
                
        await usecase.execute(input);
        await usecase.execute(input2);

        const listResponse = await request(app).get('/product').send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product0 = listResponse.body.products[0];
        expect(product0.name).toBe(input.name);
        expect(product0.price).toBe(input.price);
        const product1 = listResponse.body.products[1];
        expect(product1.name).toBe(input2.name);
        expect(product1.price).toBe(input2.price);
    });
})