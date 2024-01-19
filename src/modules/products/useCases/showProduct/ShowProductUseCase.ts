import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'

export class ShowProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(id: string): Promise<IProduct> {}
}
