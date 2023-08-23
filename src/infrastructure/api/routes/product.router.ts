import express, {Request, Response} from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

// customerRoute.post('/', async (req: Request, res: Response) => {
//     const usecase = new CreateProductUsecase(new CustomerRepository());
//     try {
//         const customerDto = {
//             name: req.body.name,
//             address: {
//                 street: req.body.address.street,
//                 city: req.body.address.city,
//                 number: req.body.address.number,
//                 zip: req.body.address.zip,
//             }
//         }

//         const output = await usecase.execute(customerDto);
//         res.send(output);
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })

productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try{
        const output = await usecase.execute({});
        res.send(output);
    }catch (err) {
        res.status(500).send(err)
    }
})