import express, {Request, Response} from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import CreateProductUsecase from "../../../usecase/product/create/create.product.usecase";

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUsecase(new ProductRepository());
    try {
        const customerDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,
        }

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err)
    }
})

productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try{
        const output = await usecase.execute({});
        res.send(output);
    }catch (err) {
        res.status(500).send(err)
    }
})