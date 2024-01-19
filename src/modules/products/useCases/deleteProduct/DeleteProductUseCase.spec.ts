import { beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ProductsRepositoryInMemory } from '@modules/products/infra/fakes/ProductsRepositoryInMemory'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { DeleteProductUseCase } from './DeleteProductUseCase'
import { AppError } from '@shared/errors/AppError'

const product_payload = { description: 'product_description', name: 'product_name', price: 10 }
const category_payload = { name: 'category_name' }

let deleteProductUseCase: DeleteProductUseCase
let categoryRepository: ICategoriesRepository
let productRepository: IProductsRepository
let product: IProduct

describe('DeleteProductUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    productRepository = new ProductsRepositoryInMemory()

    const { id: category_id } = await categoryRepository.create(category_payload)
    product = await productRepository.create({ ...product_payload, category_id })

    deleteProductUseCase = new DeleteProductUseCase(productRepository)
  })

  it('should not be possible to accept an invalid uuid.', async () => {
    await expect(deleteProductUseCase.execute('invalid-uuid')).rejects.toThrow(ZodError)
  })

  it('should return an error when not finding a product.', async () => {
    await expect(deleteProductUseCase.execute('cc9c8edf-d252-453f-b362-ae75ce1dc9cb')).rejects.toEqual(
      new AppError('Product not found!', 404)
    )
  })

  it('should be possible to remove a product successfully!', async () => {
    const response = await deleteProductUseCase.execute(product.id)

    expect(await productRepository.show(product.id)).toBeUndefined()
    expect(response).toEqual({ message: 'Product removed successfully!' })
  })
})
