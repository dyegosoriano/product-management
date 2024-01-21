import { beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { CategoriesRepositoryInMemory } from '@modules/categories/infra/fakes/CategoriesRepositoryInMemory'
import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ProductsRepositoryInMemory } from '@modules/products/infra/fakes/ProductsRepositoryInMemory'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { ShowProductInstallmentUseCase } from './ShowProductInstallmentUseCase'
import { AppError } from '@shared/errors/AppError'

const product_payload = { description: 'product_description', name: 'product_name', price: 1000 }
const category_payload = { name: 'category_name', percentage: 0.1 }

let categoryRepository: ICategoriesRepository
let showProductInstallmentUseCase: ShowProductInstallmentUseCase
let productRepository: IProductsRepository
let product: IProduct

describe('ShowProductInstallmentUseCase', () => {
  beforeAll(async () => {
    categoryRepository = new CategoriesRepositoryInMemory()
    productRepository = new ProductsRepositoryInMemory()

    const { id: category_id } = await categoryRepository.create(category_payload)
    product = await productRepository.create({ ...product_payload, category_id })

    showProductInstallmentUseCase = new ShowProductInstallmentUseCase(categoryRepository, productRepository)
  })

  it('should not be possible to accept an invalid uuid.', async () => {
    await expect(showProductInstallmentUseCase.execute({ fees: 10, product_id: 'invalid-uuid' })).rejects.toThrow(
      ZodError
    )
  })

  it('should return an error when not finding a product.', async () => {
    await expect(
      showProductInstallmentUseCase.execute({ fees: 10, product_id: 'cc9c8edf-d252-453f-b362-ae75ce1dc9cb' })
    ).rejects.toEqual(new AppError('Product not found!', 404))
  })

  it('must return a product.', async () => {
    const response = await showProductInstallmentUseCase.execute({ fees: 10, product_id: product.id })

    expect(response.installment).toEqual(162.75)
    expect(response.name).toEqual(product.name)
    expect(response.id).toEqual(product.id)
  })
})
