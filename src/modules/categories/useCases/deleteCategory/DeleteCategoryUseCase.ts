import { inject, injectable } from 'tsyringe'
import { z } from 'zod'

import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { errors } from '@shared/errors/constants'
import { AppError } from '@shared/errors/AppError'

const validationId = z.object({ id: z.string().uuid(errors.id) })

interface IResponse {
  message: string
}

@injectable()
export class DeleteCategoryUseCase {
  constructor(@inject('CategoriesRepository') private readonly categoryRepository: ICategoriesRepository) {}

  async execute(id: string): Promise<IResponse> {
    const { id: category_id } = validationId.parse({ id })

    const category = await this.categoryRepository.show(category_id)
    if (!category) throw new AppError('Category not found!', 404)

    await this.categoryRepository.delete(category_id)

    return { message: 'Category removed successfully!' }
  }
}
