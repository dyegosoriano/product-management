import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase'

export class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase)
    const message = await deleteCategoryUseCase.execute(request.params.id as string)

    return response.status(200).json(message)
  }
}
