import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateProductUseCase } from './UpdateProductUseCase'

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { params, body } = request

    const updateProductUseCase = container.resolve(UpdateProductUseCase)
    const product = await updateProductUseCase.execute({ id: params.id, data: body })

    return response.status(200).json(product)
  }
}
