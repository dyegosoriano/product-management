import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { IFindAllResults } from '@core/types/utils/IFindAllResults'
import * as productsDTOs from '../../domains/DTOs/productsDTOs'
import { Product } from '@modules/products/entities/Product'
import { paginateArray } from '@shared/utils'

export class ProductsRepositoryInMemory implements IProductsRepository {
  private repository: IProduct[] = []

  async create(data: productsDTOs.ICreateProductDTO): Promise<IProduct> {
    const product = new Product()
    Object.assign(product, { ...data })
    this.repository.push(product)

    return product
  }

  async update(id: string, data: productsDTOs.IUpdateProductDTO): Promise<IProduct> {
    const product_index = this.repository.findIndex(category => category.id === id)
    if (product_index === -1) throw new Error('Product not found.')

    const product = this.repository[product_index]

    Object.assign(product, { ...data })
    this.repository[product_index] = product

    return product
  }

  async show(id: string): Promise<IProduct> {
    return this.repository.find(product => product.id === id) as IProduct
  }

  async delete(id: string): Promise<void> {
    this.repository = this.repository.filter(product => product.id !== id)
  }

  async findAll({
    category_id,
    page_size,
    page,
    name
  }: productsDTOs.IFindAllProductsDTO): Promise<IFindAllResults<IProduct>> {
    let repoClone = this.repository
    let repoPaginate = repoClone

    if (name) repoClone = repoClone.filter(item => item.name.toUpperCase().includes(name.toUpperCase()))
    if (category_id) repoClone = repoClone.filter(item => item.category_id === category_id)

    if (page_size && page) repoPaginate = paginateArray({ array: repoClone, page, page_size })

    return { total: repoClone.length, results: repoPaginate }
  }
}
