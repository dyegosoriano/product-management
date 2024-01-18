import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ICategory } from '@modules/categories/domains/models/ICategory'
import { IFindAllResults } from '@core/types/utils/IFindAllResults'
import * as categoriesDTOs from '../../domains/DTOs/categoriesDTOs'
import { Category } from '@modules/categories/entities/Category'
import { paginateArray } from '@shared/utils'

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private repository: ICategory[] = []

  async create(data: categoriesDTOs.ICreateCategoryDTO): Promise<ICategory> {
    const category = new Category()
    Object.assign(category, { ...data })
    this.repository.push(category)

    return category
  }

  async update(id: string, data: categoriesDTOs.IUpdateCategoryDTO): Promise<ICategory> {
    const category_index = this.repository.findIndex(category => category.id === id)
    if (category_index === -1) throw new Error('Category not found.')

    const category = this.repository[category_index]

    Object.assign(category, { ...data })
    this.repository[category_index] = category

    return category
  }

  async show(id: string): Promise<ICategory> {
    return this.repository.find(category => category.id === id) as ICategory
  }

  async delete(id: string): Promise<void> {
    this.repository = this.repository.filter(category => category.id !== id)
  }

  async findAll({ page_size, page, name }: categoriesDTOs.IFindAllCategoriesDTO): Promise<IFindAllResults<ICategory>> {
    let repoClone = this.repository

    if (name) repoClone = repoClone.filter(item => item.name.toUpperCase().includes(name.toUpperCase()))
    if (page_size && page) repoClone = paginateArray({ array: repoClone, page, page_size })

    return { total: repoClone.length + 1, results: repoClone }
  }
}
