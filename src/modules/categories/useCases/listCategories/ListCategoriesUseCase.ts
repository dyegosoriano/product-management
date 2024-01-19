import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { validationListCategories } from '@modules/categories/validations/validationCategories'
import { IFindAllCategoriesDTO } from '@modules/categories/domains/DTOs/categoriesDTOs'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { IResultList } from '@core/types/utils/IResultList'

@injectable()
export class ListCategoriesUseCase {
  constructor(@inject('CategoriesRepository') private readonly categoryRepository: ICategoriesRepository) {}

  async execute(data: IFindAllCategoriesDTO): Promise<IResultList<ICategory>> {
    const valid_data = validationListCategories.parse(data)

    const { total, results } = await this.categoryRepository.findAll(valid_data)

    return {
      total_pages: Math.ceil(total / valid_data.page_size),
      total: total,
      page_size: +valid_data.page_size,
      page: +valid_data.page,
      results
    }
  }
}
