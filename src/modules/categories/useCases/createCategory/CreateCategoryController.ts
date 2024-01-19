import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    const category = await createCategoryUseCase.execute(body)

    return response.status(201).json(category)
  }
}
