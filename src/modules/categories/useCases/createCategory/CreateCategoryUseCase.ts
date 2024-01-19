import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { validationCreateCategory } from '@modules/categories/validations/validationCategories'
import { ICreateCategoryDTO } from '@modules/categories/domains/DTOs/categoriesDTOs'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class CreateCategoryUseCase {
  constructor(@inject('CategoriesRepository') private readonly categoryRepository: ICategoriesRepository) {}

  async execute(data: ICreateCategoryDTO): Promise<ICategory> {
    const valid_data = validationCreateCategory.parse(data)

    const categoryExist = await this.categoryRepository.findAll({ name: valid_data.name, page_size: 1, page: 1 })
    if (categoryExist.results.length > 0) throw new AppError('Category already exists!', 401)

    return await this.categoryRepository.create(valid_data)
  }
}
