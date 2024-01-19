import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ShowProductUseCase } from './ShowProductUseCase'

export class ShowProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showProductUseCase = container.resolve(ShowProductUseCase)
    const product = await showProductUseCase.execute(request.params.id as string)

    return response.status(200).json(product)
  }
}
