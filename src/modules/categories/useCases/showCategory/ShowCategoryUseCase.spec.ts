import { beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { ShowCategoryUseCase } from './ShowCategoryUseCase'
import { AppError } from '@shared/errors/AppError'

let showCategoryUseCase: ShowCategoryUseCase
let categoryRepository: ICategoriesRepository
let category: ICategory

describe('ShowCategoryUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()

    showCategoryUseCase = new ShowCategoryUseCase(categoryRepository)

    category = await categoryRepository.create({ name: 'category_name' })
  })

  it('should return an error if an invalid uuid is entered', async () => {
    await expect(showCategoryUseCase.execute('invalid_uuid')).rejects.toThrow(ZodError)
  })

  it('should return an error if the category was not found', async () => {
    await expect(showCategoryUseCase.execute('cc9c8edf-d252-453f-b362-ae75ce1dc9cb')).rejects.toEqual(
      new AppError('Category not found!', 404)
    )
  })

  it('must be possible to display an existing category', async () => {
    const response = await showCategoryUseCase.execute(category.id)
    expect(response.id).toEqual(category.id)
  })
})
