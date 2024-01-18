import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'

interface IRequest {}

interface IResponse {
  message: string
}

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute(data: IRequest): Promise<IResponse> {
    return { message: 'Category removed successfully!' }
  }
}
