import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    const categories = await listCategoriesUseCase.execute(request.query as any)

    return response.status(200).json(categories)
  }
}
