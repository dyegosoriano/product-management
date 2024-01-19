import { inject, injectable } from 'tsyringe'
import { z } from 'zod'

import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { errors } from '@shared/errors/constants'
import { AppError } from '@shared/errors/AppError'

const validationId = z.object({ id: z.string().uuid(errors.id) })

@injectable()
export class ShowProductUseCase {
  constructor(@inject('ProductsRepository') private readonly productsRepository: IProductsRepository) {}

  async execute(id: string): Promise<IProduct> {
    const { id: product_id } = validationId.parse({ id })

    const product = await this.productsRepository.show(product_id)
    if (!product) throw new AppError('Product not found!', 404)

    return product
  }
}
