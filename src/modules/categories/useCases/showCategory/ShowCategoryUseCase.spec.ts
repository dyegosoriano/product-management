import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase'
import { ShowCategoryUseCase } from './ShowCategoryUseCase'
import { AppError } from '@shared/errors/AppError'

let createCategoryUseCase: CreateCategoryUseCase
let showCategoryUseCase: ShowCategoryUseCase
let categoryRepository: ICategoriesRepository
let category_id: string

describe('ShowCategoryUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
    showCategoryUseCase = new ShowCategoryUseCase(categoryRepository)

    const { id } = await createCategoryUseCase.execute({ name: 'category_name' })

    category_id = id
  })

  it('should return an error if an invalid uuid is entered', async () => {
    await expect(showCategoryUseCase.execute('invalid_uuid')).rejects.toThrow(ZodError)
  })

  it('should return an error if the category was not found', async () => {
    await expect(showCategoryUseCase.execute('cc9c8edf-d252-453f-b362-ae75ce1dc9cb')).rejects.toEqual(
      new AppError('Category not found')
    )
  })

  it('must be possible to display an existing category', async () => {
    const category = await showCategoryUseCase.execute(category_id)
    expect(category.id).toEqual(category_id)
  })
})
