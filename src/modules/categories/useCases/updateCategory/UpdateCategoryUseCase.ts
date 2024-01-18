import { z } from 'zod'

import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IUpdateCategoryDTO } from '@modules/categories/domains/DTOs/categoriesDTOs'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { errors } from '@shared/errors/constants'
import { validationUpdateCategory } from '@modules/categories/validations/validationCategories'
import { AppError } from '@shared/errors/AppError'

const validationId = z.object({ id: z.string().uuid(errors.id) })

interface IRequest {
  data: IUpdateCategoryDTO
  id: string
}

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute({ data, id }: IRequest): Promise<ICategory> {
    const valid_data = validationUpdateCategory.parse(data)
    const { id: category_id } = validationId.parse({ id })

    const category = await this.categoryRepository.show(category_id)
    if (!category) throw new AppError('Category not found')

    const categoryExist = await this.categoryRepository.findAll({ name: valid_data.name, page_size: 1, page: 1 })
    if (categoryExist.results.length > 0) throw new AppError('Category already exists')

    return await this.categoryRepository.update(category_id, valid_data)
  }
}
