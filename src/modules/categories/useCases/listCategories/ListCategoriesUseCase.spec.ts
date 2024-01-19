// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeAll, describe, expect, it } from 'vitest'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

const categories = [
  { name: 'sportive articles' },
  { name: 'beauty products' },
  { name: 'electronics' },
  { name: 'gardening' },
  { name: 'furniture' },
  { name: 'clothing' },
  { name: 'foods' },
  { name: 'books' },
  { name: 'toys' },
  { name: 'pets' }
]

let createCategoryUseCase: CreateCategoryUseCase
let listCategoriesUseCase: ListCategoriesUseCase
let categoryRepository: ICategoriesRepository

describe('ListCategoriesUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()

    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
    listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository)

    for await (const category of categories) {
      await createCategoryUseCase.execute(category)
    }
  })

  it('must return a list with a maximum of five categories', async () => {
    const response = await listCategoriesUseCase.execute({ page_size: 5, page: 1 })
    expect(response.results.length).toEqual(5)
  })

  it('should return a list of categories that have the letters "oo" in their name', async () => {
    const response = await listCategoriesUseCase.execute({ page_size: 2, page: 1, name: 'Oo' })

    expect(response.results[0].name).toEqual('foods')
    expect(response.results.length).toEqual(2)
  })

  it('must return a total of 5 pages and the pagination must contain 2 items', async () => {
    const response = await listCategoriesUseCase.execute({ page_size: 2, page: 1 })

    expect(response.total_pages).toEqual(5)
    expect(response.total).toEqual(10)
  })
})
