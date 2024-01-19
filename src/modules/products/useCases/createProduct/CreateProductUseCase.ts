import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { ICreateProductDTO } from '@modules/products/domains/DTOs/productsDTOs'
import { IProduct } from '@modules/products/domains/models/IProduct'

export class CreateProductUseCase {
  constructor(
    private readonly categoryRepository: ICategoriesRepository,
    private readonly productsRepository: IProductsRepository
  ) {}

  async execute(data: ICreateProductDTO): Promise<IProduct> {}
}
