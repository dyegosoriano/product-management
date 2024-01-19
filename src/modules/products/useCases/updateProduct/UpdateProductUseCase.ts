import { z } from 'zod'

import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { validationUpdateProduct } from '@modules/products/validations/validationProducts'
import { IUpdateProductDTO } from '@modules/products/domains/DTOs/productsDTOs'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

const validationId = z.object({ id: z.string().uuid(errors.id) })

interface IRequest {
  data: IUpdateProductDTO
  id: string
}

export class UpdateProductUseCase {
  constructor(
    private readonly categoryRepository: ICategoriesRepository,
    private readonly productsRepository: IProductsRepository
  ) {}

  async execute({ data, id }: IRequest): Promise<IProduct> {
    const valid_data = validationUpdateProduct.parse(data)
    const { id: product_id } = validationId.parse({ id })

    const product = await this.productsRepository.show(product_id)
    if (!product) throw new AppError('Product not found!', 404)

    const productExist = await this.productsRepository.findAll({
      category_id: valid_data.category_id,
      name: valid_data.name,
      page_size: 1,
      page: 1
    })

    if (productExist.results.length > 0) throw new AppError('Product already exists!', 401)

    if (!!valid_data.category_id) {
      const category = await this.categoryRepository.show(valid_data.category_id)
      if (!category) throw new AppError('Category not found!', 404)
    }

    return await this.productsRepository.update(product_id, valid_data)
  }
}
