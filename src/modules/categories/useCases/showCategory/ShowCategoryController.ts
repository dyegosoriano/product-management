import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ShowCategoryUseCase } from './ShowCategoryUseCase'

export class ShowCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showCategoryUseCase = container.resolve(ShowCategoryUseCase)
    const category = await showCategoryUseCase.execute(request.params.id as string)

    return response.status(200).json(category)
  }
}
