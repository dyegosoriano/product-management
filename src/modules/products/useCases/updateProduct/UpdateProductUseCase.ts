import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IUpdateProductDTO } from '@modules/products/domains/DTOs/productsDTOs'
import { IProduct } from '@modules/products/domains/models/IProduct'

export class UpdateProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(data: IUpdateProductDTO): Promise<IProduct> {}
}
