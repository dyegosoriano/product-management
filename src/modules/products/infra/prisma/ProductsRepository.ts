import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { IFindAllResults } from '@core/types/utils/IFindAllResults'
import * as productsDTOs from '../../domains/DTOs/productsDTOs'
import { Product } from '@modules/products/entities/Product'
import { prisma } from '@infra/prisma/client'

export class ProductsRepository implements IProductsRepository {
  async create(data: productsDTOs.ICreateProductDTO): Promise<IProduct> {
    const product = new Product()
    Object.assign(product, { ...data })

    return await prisma.products.create({ data: product })
  }

  async update(id: string, data: productsDTOs.IUpdateProductDTO): Promise<IProduct> {
    return await prisma.products.update({ where: { id }, data })
  }

  async show(id: string): Promise<IProduct> {
    return (await prisma.products.findUnique({ where: { id } })) as IProduct
  }

  async delete(id: string): Promise<void> {
    await prisma.products.delete({ where: { id } })
  }

  async findAll({
    category_id,
    page_size,
    page,
    name
  }: productsDTOs.IFindAllProductsDTO): Promise<IFindAllResults<IProduct>> {
    const where = {}

    if (!!name) Object.assign(where, { name: { contains: name, mode: 'insensitive' } })
    if (!!category_id) Object.assign(where, { category_id })

    const [total, results] = await prisma.$transaction([
      prisma.products.count({ where }),
      prisma.products.findMany({
        skip: +page === 0 || +page === 1 ? 0 : page * page_size,
        orderBy: { created_at: 'asc' },
        take: +page_size,
        where
      })
    ])

    return { total, results }
  }
}
