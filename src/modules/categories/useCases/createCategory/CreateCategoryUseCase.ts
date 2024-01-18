import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { ICreateCategoryDTO } from '@modules/categories/domains/DTOs/categoriesDTOs'
import { IProduct } from '@modules/products/domains/models/IProduct'

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute(data: ICreateCategoryDTO): Promise<IProduct> {
    return data
  }
}
