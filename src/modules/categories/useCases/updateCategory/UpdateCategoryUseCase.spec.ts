import { beforeEach, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase'
import { AppError } from '@shared/errors/AppError'

let updateCategoryUseCase: UpdateCategoryUseCase
let categoryRepository: ICategoriesRepository
let category: ICategory

describe('UpdateCategoryUseCase', () => {
  beforeEach(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()

    updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)

    category = await categoryRepository.create({ name: 'category_name' })
  })

  it('the category must contain a minimum of 3 letters and a maximum of 30', async () => {
    await expect(updateCategoryUseCase.execute({ id: category.id, data: { name: '01' } })).rejects.toThrow(ZodError)

    await expect(
      updateCategoryUseCase.execute({ id: category.id, data: { name: '0123456789 ABCDEFGHIJKLMNOPQRSTUVZWYZ' } })
    ).rejects.toThrow(ZodError)
  })

  it('should return an error if an invalid uuid is entered', async () => {
    await expect(
      updateCategoryUseCase.execute({ id: 'invalid_uuid', data: { name: 'category_name' } })
    ).rejects.toThrow(ZodError)
  })

  it('should return an error if the category was not found', async () => {
    await expect(
      updateCategoryUseCase.execute({
        id: 'cc9c8edf-d252-453f-b362-ae75ce1dc9cb',
        data: { name: 'category_inexistent' }
      })
    ).rejects.toEqual(new AppError('Category not found!', 404))
  })

  it('should not be possible to update a category with an existing name', async () => {
    await expect(updateCategoryUseCase.execute({ id: category.id, data: { name: 'category_name' } })).rejects.toEqual(
      new AppError('Category already exists!', 401)
    )
  })

  it('should be possible to update a category', async () => {
    const response = await updateCategoryUseCase.execute({ id: category.id, data: { name: 'new_category_name' } })
    expect(response.name).toEqual('new_category_name')
  })
})
