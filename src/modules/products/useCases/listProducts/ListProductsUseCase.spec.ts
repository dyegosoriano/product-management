import { beforeAll, describe, expect, it } from 'vitest'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ProductsRepositoryInMemory } from '@modules/products/infra/fakes/ProductsRepositoryInMemory'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { ListProductsUseCase } from './ListProductsUseCase'

const products = [
  { description: 'description - 01', price: 1, name: 'Laptop' },
  { description: 'description - 02', price: 2, name: 'Wireless Keyboard' },
  { description: 'description - 03', price: 3, name: 'USB Flash Drive' },
  { description: 'description - 04', price: 4, name: 'External Hard Drive' },
  { description: 'description - 05', price: 5, name: 'Webcam' },
  { description: 'description - 06', price: 6, name: 'Gaming Mouse' },
  { description: 'description - 07', price: 7, name: 'Wireless Router' },
  { description: 'description - 08', price: 8, name: 'Graphics Card' },
  { description: 'description - 09', price: 9, name: 'RAM Memory' },
  { description: 'description - 10', price: 10, name: 'SSD (Solid State Drive)' }
] as IProduct[]

let categoryRepository: ICategoriesRepository
let listProductsUseCase: ListProductsUseCase
let productRepository: IProductsRepository
let category: ICategory

describe('ListProductsUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    productRepository = new ProductsRepositoryInMemory()

    listProductsUseCase = new ListProductsUseCase(productRepository)

    category = await categoryRepository.create({ name: 'all' })

    for await (const product of products) {
      await productRepository.create({ ...product, category_id: category.id })
    }
  })

  it('must return a list with a maximum of five products', async () => {
    const response = await listProductsUseCase.execute({ page_size: 5, page: 1 })
    expect(response.results.length).toEqual(5)
  })

  it('should return a list of products that have the letters "lEss" in their name', async () => {
    const response = await listProductsUseCase.execute({ page_size: 2, page: 1, name: 'lEss' })

    expect(response.results[0].name).toEqual('Wireless Keyboard')
    expect(response.results.length).toEqual(2)
  })

  it('must return a total of 5 pages and the pagination must contain 2 items', async () => {
    const response = await listProductsUseCase.execute({ page_size: 2, page: 1 })

    expect(response.total_pages).toEqual(5)
    expect(response.total).toEqual(10)
  })
})
