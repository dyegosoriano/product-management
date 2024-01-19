import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'

interface IResponse {
  message: string
}

export class DeleteProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(id: string): Promise<IResponse> {
    return { message: 'Product removed successfully!' }
  }
}
