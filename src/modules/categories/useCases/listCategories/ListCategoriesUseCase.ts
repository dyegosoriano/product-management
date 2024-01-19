import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IFindAllCategoriesDTO } from '@modules/categories/domains/DTOs/categoriesDTOs'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { IResultList } from '@core/types/utils/IResultList'

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute(data: IFindAllCategoriesDTO): Promise<IResultList<ICategory>> {}
}
