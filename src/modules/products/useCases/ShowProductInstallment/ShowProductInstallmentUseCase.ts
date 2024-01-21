import { inject, injectable } from 'tsyringe'
import { z } from 'zod'

import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { AppError } from '@shared/errors/AppError'
import { handleInstallment } from '@shared/utils'
import { errors } from '@shared/errors/constants'

const validationRequest = z.object({
  fees: z.number().positive().min(2).max(12),
  product_id: z.string().uuid(errors.id)
})

type IRequest = z.infer<typeof validationRequest>

@injectable()
export class ShowProductInstallmentUseCase {
  constructor(
    @inject('CategoriesRepository') private readonly categoryRepository: ICategoriesRepository,
    @inject('ProductsRepository') private readonly productsRepository: IProductsRepository
  ) {}

  async execute(data: IRequest): Promise<IProduct & { installment: number }> {
    const valid_data = validationRequest.parse(data)

    const product = await this.productsRepository.show(valid_data.product_id)
    if (!product) throw new AppError('Product not found!', 404)

    const category = await this.categoryRepository.show(product.category_id)
    if (!category) throw new AppError('Category not found!', 404)

    const installment = handleInstallment({
      product_value: Number(product.price),
      percentage: category.percentage,
      installments: valid_data.fees
    })

    return { ...product, installment }
  }
}
