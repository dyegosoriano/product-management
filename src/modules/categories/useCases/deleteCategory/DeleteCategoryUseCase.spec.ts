import { beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase'
import { AppError } from '@shared/errors/AppError'

let deleteCategoryUseCase: DeleteCategoryUseCase
let categoryRepository: ICategoriesRepository
let category: ICategory

describe('DeleteCategoryUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()

    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)

    category = await categoryRepository.create({ name: 'category_name', percentage: 0.1 })
  })

  it('should return an error if an invalid uuid is entered', async () => {
    await expect(deleteCategoryUseCase.execute('invalid_uuid')).rejects.toThrow(ZodError)
  })

  it('should return an error if the category was not found', async () => {
    await expect(deleteCategoryUseCase.execute('cc9c8edf-d252-453f-b362-ae75ce1dc9cb')).rejects.toEqual(
      new AppError('Category not found!', 404)
    )
  })

  it('should be possible to remove a category successfully!', async () => {
    const response = await deleteCategoryUseCase.execute(category.id)

    expect(await categoryRepository.show(category.id)).toBeUndefined()
    expect(response).toEqual({ message: 'Category removed successfully!' })
  })
})
