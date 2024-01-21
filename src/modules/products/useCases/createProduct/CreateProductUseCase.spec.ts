import { beforeEach, describe, expect, it } from 'vitest'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ProductsRepositoryInMemory } from '@modules/products/infra/fakes/ProductsRepositoryInMemory'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { CreateProductUseCase } from './CreateProductUseCase'
import { AppError } from '@shared/errors/AppError'
import { ZodError } from 'zod'

const category_payload = { name: 'category_name', percentage: 0.1 }
const product_payload = {
  category_id: 'cc9c8edf-d252-453f-b362-ae75ce1dc9cb',
  description: 'product_description',
  name: 'product_name',
  price: 10
}

let createProductUseCase: CreateProductUseCase
let categoryRepository: ICategoriesRepository
let productRepository: IProductsRepository
let category_id: string

describe('CreateProductUseCase', () => {
  beforeEach(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    productRepository = new ProductsRepositoryInMemory()

    createProductUseCase = new CreateProductUseCase(categoryRepository, productRepository)

    const category = await categoryRepository.create(category_payload)
    category_id = category.id
  })

  it('must be possible to create a product with all the characteristics stated.', async () => {
    const product = await createProductUseCase.execute({ ...product_payload, category_id })

    expect(product.description).toEqual(product_payload.description)
    expect(product.price).toEqual(product_payload.price)
    expect(product.name).toEqual(product_payload.name)
    expect(product.category_id).toEqual(category_id)
    expect(product).toHaveProperty('id')
  })

  it('the category must contain a minimum of 3 letters and a maximum of 30', async () => {
    await expect(createProductUseCase.execute({ ...product_payload, category_id, name: '01' })).rejects.toThrow(
      ZodError
    )
    await expect(
      createProductUseCase.execute({ ...product_payload, category_id, name: '0123456789 ABCDEFGHIJKLMNOPQRSTUVZWYZ' })
    ).rejects.toThrow(ZodError)
  })

  it('should not be possible to create a product by entering an invalid category uuid.', async () => {
    await expect(createProductUseCase.execute({ ...product_payload, category_id: 'invalid-uuid' })).rejects.toThrow(
      ZodError
    )
  })

  it('should not be possible to create a product with a non-existent category.', async () => {
    await expect(createProductUseCase.execute({ ...product_payload })).rejects.toEqual(
      new AppError('Category not found!')
    )
  })

  it('should not be possible to create a product with an existing name.', async () => {
    await createProductUseCase.execute({ ...product_payload, category_id })

    await expect(createProductUseCase.execute({ ...product_payload, category_id })).rejects.toEqual(
      new AppError('Product already exists')
    )
  })
})
