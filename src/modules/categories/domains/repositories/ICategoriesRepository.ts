import { IFindAllResults } from '@core/types/utils/IFindAllResults'

import { ICategory } from '../models/ICategory'

import * as categoriesDTOs from '../DTOs/categoriesDTOs'

export interface ICategoriesRepository {
  create(data: categoriesDTOs.ICreateCategoryDTO): Promise<ICategory>
  update(id: string, data: categoriesDTOs.IUpdateCategoryDTO): Promise<ICategory>
  show(id: string): Promise<ICategory>
  delete(id: string): Promise<void>
  findAll(data: categoriesDTOs.IFindAllCategoriesDTO): Promise<IFindAllResults<ICategory>>
}
