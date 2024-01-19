import { beforeEach, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { AppError } from '@shared/errors/AppError'

const category_payload = { name: 'category_name' }

let createCategoryUseCase: CreateCategoryUseCase
let categoryRepository: ICategoriesRepository

describe('CreateCategoryUseCase', () => {
  beforeEach(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
  })

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute(category_payload)
    expect(category).toHaveProperty('id')
  })

  it('should not be possible to create a category with an already existing name', async () => {
    await createCategoryUseCase.execute(category_payload)

    await expect(createCategoryUseCase.execute(category_payload)).rejects.toEqual(
      new AppError('Category already exists!', 401)
    )
  })

  it('the category must contain a minimum of 3 letters and a maximum of 30', async () => {
    await expect(createCategoryUseCase.execute({ name: '01' })).rejects.toThrow(ZodError)
    await expect(createCategoryUseCase.execute({ name: '0123456789 ABCDEFGHIJKLMNOPQRSTUVZWYZ' })).rejects.toThrow(
      ZodError
    )
  })
})
