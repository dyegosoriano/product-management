import { z } from 'zod'

import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

const validationId = z.object({ id: z.string().uuid(errors.id) })

interface IResponse {
  message: string
}

export class DeleteProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(id: string): Promise<IResponse> {
    const { id: product_id } = validationId.parse({ id })

    const product = await this.productsRepository.show(product_id)
    if (!product) throw new AppError('Product not found!', 404)

    await this.productsRepository.delete(product_id)

    return { message: 'Product removed successfully!' }
  }
}
