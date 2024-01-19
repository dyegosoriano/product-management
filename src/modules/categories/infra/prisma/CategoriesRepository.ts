import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import * as categoriesDTOs from '../../domains/DTOs/categoriesDTOs'
import { IFindAllResults } from '@core/types/utils/IFindAllResults'
import { Category } from '@modules/categories/entities/Category'
import { prisma } from '@infra/prisma/client'

export class CategoriesRepository implements ICategoriesRepository {
  async create(data: categoriesDTOs.ICreateCategoryDTO): Promise<ICategory> {
    const category = new Category()
    Object.assign(category, { ...data })

    return await prisma.categories.create({ data: category })
  }

  async update(id: string, data: categoriesDTOs.IUpdateCategoryDTO): Promise<ICategory> {
    return await prisma.categories.update({ where: { id }, data })
  }

  async show(id: string): Promise<ICategory> {
    return (await prisma.categories.findUnique({ where: { id } })) as ICategory
  }

  async delete(id: string): Promise<void> {
    await prisma.categories.delete({ where: { id } })
  }

  async findAll({ page_size, page, name }: categoriesDTOs.IFindAllCategoriesDTO): Promise<IFindAllResults<ICategory>> {
    const where = {}

    if (!!name) Object.assign(where, { name: { contains: name, mode: 'insensitive' } })

    const [total, results] = await prisma.$transaction([
      prisma.categories.count({ where }),
      prisma.categories.findMany({
        skip: +page === 0 || +page === 1 ? 0 : page * page_size,
        orderBy: { created_at: 'asc' },
        take: +page_size,
        where
      })
    ])

    return { total, results }
  }
}
