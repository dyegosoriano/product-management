import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateCategoryUseCase } from './UpdateCategoryUseCase'

export class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { params, body } = request

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase)
    const category = await updateCategoryUseCase.execute({ data: body, id: params.id })

    return response.status(200).json(category)
  }
}
