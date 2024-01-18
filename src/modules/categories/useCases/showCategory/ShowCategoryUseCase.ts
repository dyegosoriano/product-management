import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IProduct } from '@modules/products/domains/models/IProduct'

export class ShowCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute(id: string): Promise<IProduct> {}
}
