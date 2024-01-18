import { z } from 'zod'

import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

const validationId = z.object({ id: z.string().uuid(errors.id) })

export class ShowCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute(id: string): Promise<ICategory> {
    const { id: category_id } = validationId.parse({ id })

    const category = await this.categoryRepository.show(category_id)
    if (!category) throw new AppError('Category not found')

    return category
  }
}
