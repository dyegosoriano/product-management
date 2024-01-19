import { beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ProductsRepositoryInMemory } from '@modules/products/infra/fakes/ProductsRepositoryInMemory'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { UpdateProductUseCase } from './UpdateProductUseCase'
import { AppError } from '@shared/errors/AppError'

const payload_product = { description: 'product description updated', name: 'product name updated', price: 10 }
const payload_category = { name: 'category_name' }

let updateProductUseCase: UpdateProductUseCase
let categoryRepository: ICategoriesRepository
let productRepository: IProductsRepository
let category_id: string
let product: IProduct

describe('updateProduct', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    productRepository = new ProductsRepositoryInMemory()

    updateProductUseCase = new UpdateProductUseCase(productRepository)

    const category = await categoryRepository.create(payload_category)

    product = await productRepository.create({
      description: 'product description',
      category_id: category.id,
      name: 'product name',
      price: 10
    })

    category_id = category.id
  })

  it('the category must contain a minimum of 3 letters and a maximum of 30', async () => {
    await expect(updateProductUseCase.execute({ ...payload_product, category_id, name: '01' })).rejects.toThrow(
      ZodError
    )

    await expect(
      updateProductUseCase.execute({ ...payload_product, category_id, name: '0123456789 ABCDEFGHIJKLMNOPQRSTUVZWYZ' })
    ).rejects.toThrow(ZodError)
  })

  it('should not be possible to accept an invalid uuid.', async () => {
    await expect(updateProductUseCase.execute({ ...payload_product, category_id: 'invalid-uuid' })).rejects.toThrow(
      ZodError
    )
  })

  it('should return an error when not finding a product.', async () => {
    await expect(
      updateProductUseCase.execute({ ...payload_product, category_id: 'cc9c8edf-d252-453f-b362-ae75ce1dc9cb' })
    ).rejects.toEqual(new AppError('Product not found!', 404))
  })

  it('should not be possible to update a product with a non-existent category.', async () => {
    await expect(updateProductUseCase.execute({ ...payload_product })).rejects.toEqual(
      new AppError('Category not found!', 404)
    )
  })

  it('should not be possible to update a product with an existing name.', async () => {
    await updateProductUseCase.execute({ ...payload_product, category_id })

    await expect(updateProductUseCase.execute({ ...payload_product, category_id })).rejects.toEqual(
      new AppError('Product already exists!', 401)
    )
  })

  it('must be possible to update a product with all the characteristics stated.', async () => {
    const product = await updateProductUseCase.execute({ ...payload_product, category_id })

    expect(product.description).toEqual(payload_product.description)
    expect(product.price).toEqual(payload_product.price)
    expect(product.name).toEqual(payload_product.name)
    expect(product.category_id).toEqual(category_id)
    expect(product).toHaveProperty('id')
  })
})
