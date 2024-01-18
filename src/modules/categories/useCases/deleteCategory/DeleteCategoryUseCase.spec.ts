import { beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase'
import { ShowCategoryUseCase } from '../showCategory/ShowCategoryUseCase'
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase'
import { AppError } from '@shared/errors/AppError'

let createCategoryUseCase: CreateCategoryUseCase
let deleteCategoryUseCase: DeleteCategoryUseCase
let categoryRepository: ICategoriesRepository
let showCategoryUseCase: ShowCategoryUseCase
let category_id: string

describe('DeleteCategoryUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)
    showCategoryUseCase = new ShowCategoryUseCase(categoryRepository)

    const { id } = await createCategoryUseCase.execute({ name: 'category_name' })

    category_id = id
  })

  it('should return an error if an invalid uuid is entered', async () => {
    await expect(deleteCategoryUseCase.execute('invalid_uuid')).rejects.toThrow(ZodError)
  })

  it('should return an error if the category was not found', async () => {
    await expect(deleteCategoryUseCase.execute('cc9c8edf-d252-453f-b362-ae75ce1dc9cb')).rejects.toEqual(
      new AppError('Category not found')
    )
  })

  it('should be possible to remove a category successfully!', async () => {
    const response = await deleteCategoryUseCase.execute(category_id)

    await expect(showCategoryUseCase.execute(category_id)).rejects.toEqual(new AppError('Category not found'))
    expect(response).toEqual({ message: 'Category removed successfully!' })
  })
})
