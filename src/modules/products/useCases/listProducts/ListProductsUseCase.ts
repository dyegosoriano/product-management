import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { validationListProducts } from '@modules/products/validations/validationProducts'
import { IFindAllProductsDTO } from '@modules/products/domains/DTOs/productsDTOs'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { IResultList } from '@core/types/utils/IResultList'

export class ListProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(data: IFindAllProductsDTO): Promise<IResultList<ICategory>> {
    const valid_data = validationListProducts.parse(data)

    const { total, results } = await this.productsRepository.findAll(valid_data)

    return {
      total_pages: Math.ceil(total / valid_data.page_size),
      total: total,
      page_size: +valid_data.page_size,
      page: +valid_data.page,
      results
    }
  }
}
