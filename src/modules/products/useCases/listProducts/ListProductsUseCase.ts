import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { IResultList } from '@core/types/utils/IResultList'

interface IRequest {}

export class ListProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(data: IRequest): Promise<IResultList<ICategory>> {}
}
