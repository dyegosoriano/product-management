import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { validationCreateCategory } from '@modules/categories/validations/validationCategories'
import { ICreateCategoryDTO } from '@modules/categories/domains/DTOs/categoriesDTOs'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { AppError } from '@shared/errors/AppError'

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute(data: ICreateCategoryDTO): Promise<ICategory> {
    const valid_data = validationCreateCategory.parse(data)

    const categoryExist = await this.categoryRepository.findAll({ name: valid_data.name, page_size: 1, page: 1 })
    if (categoryExist.results.length > 0) throw new AppError('Category already exists')

    return await this.categoryRepository.create(valid_data)
  }
}
