import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto, Product } from "./list.product.dto";

export default class ListProductUseCase{

    private ProductRepository: ProductRepositoryInterface;
    constructor(ProductRepository: ProductRepositoryInterface){
        this.ProductRepository = ProductRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.ProductRepository.findAll()
        return OutputMapper.toOutput(products)
    }
}

class OutputMapper {
    static toOutput(Product: Product[]): OutputListProductDto {
        return {
            products: Product.map((Product) => ({
                id: Product.id,
                name: Product.name,
                price: Product.price,

            }))
        }
    }
}