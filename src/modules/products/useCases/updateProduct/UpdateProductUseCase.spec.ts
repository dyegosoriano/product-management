import { beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ProductsRepositoryInMemory } from '@modules/products/infra/fakes/ProductsRepositoryInMemory'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { UpdateProductUseCase } from './UpdateProductUseCase'
import { AppError } from '@shared/errors/AppError'

const payload_product = { description: 'description updated', name: 'name updated', price: 10 }
const payload_category = { name: 'category_name' }

let updateProductUseCase: UpdateProductUseCase
let categoryRepository: ICategoriesRepository
let productRepository: IProductsRepository
let category: ICategory
let product: IProduct

describe('updateProduct', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    productRepository = new ProductsRepositoryInMemory()

    updateProductUseCase = new UpdateProductUseCase(categoryRepository, productRepository)

    category = await categoryRepository.create(payload_category)

    product = await productRepository.create({
      description: 'product description',
      category_id: category.id,
      name: 'product name',
      price: 10
    })
  })

  it('must be possible to update a product with all the characteristics stated.', async () => {
    const response = await updateProductUseCase.execute({
      data: { ...payload_product, category_id: category.id },
      id: product.id
    })

    expect(response.description).toEqual(payload_product.description)
    expect(response.price).toEqual(payload_product.price)
    expect(response.name).toEqual(payload_product.name)
    expect(response.category_id).toEqual(category.id)
    expect(response).toHaveProperty('id')
  })

  it('the product must contain a minimum of 3 letters and a maximum of 30', async () => {
    await expect(
      updateProductUseCase.execute({
        data: { ...payload_product, category_id: category.id, name: '01' },
        id: product.id
      })
    ).rejects.toThrow(ZodError)

    await expect(
      updateProductUseCase.execute({
        data: { ...payload_product, category_id: category.id, name: '0123456789 ABCDEFGHIJKLMNOPQRSTUVZWYZ' },
        id: product.id
      })
    ).rejects.toThrow(ZodError)
  })

  it('should not be possible to accept an invalid uuid.', async () => {
    await expect(
      updateProductUseCase.execute({ id: 'invalid-uuid', data: { ...payload_product, category_id: category.id } })
    ).rejects.toThrow(ZodError)
  })

  it('should return an error when not finding a product.', async () => {
    await expect(
      updateProductUseCase.execute({
        data: { ...payload_product, category_id: category.id },
        id: 'cc9c8edf-d252-453f-b362-ae75ce1dc9cb'
      })
    ).rejects.toEqual(new AppError('Product not found!', 404))
  })

  it('should not be possible to update a product with an existing name.', async () => {
    await expect(updateProductUseCase.execute({ id: product.id, data: product })).rejects.toEqual(
      new AppError('Product already exists!', 401)
    )
  })

  it('should not be possible to update a product with a non-existent category.', async () => {
    await expect(
      updateProductUseCase.execute({
        data: { ...payload_product, category_id: 'cc9c8edf-d252-453f-b362-ae75ce1dc9cb' },
        id: product.id
      })
    ).rejects.toEqual(new AppError('Category not found!', 404))
  })

  it('should not be possible to accept an invalid uuid for categories.', async () => {
    await expect(
      updateProductUseCase.execute({
        data: { ...payload_product, category_id: 'invalid-uuid' },
        id: product.id
      })
    ).rejects.toThrow(ZodError)
  })
})
