import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IUpdateCategoryDTO } from '@modules/categories/domains/DTOs/categoriesDTOs'
import { ICategory } from '@modules/categories/domains/models/ICategory'

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute(id: string, data: IUpdateCategoryDTO): Promise<ICategory> {}
}
