import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteProductUseCase } from './DeleteProductUseCase'

export class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteProductUseCase = container.resolve(DeleteProductUseCase)
    const message = await deleteProductUseCase.execute(request.params.id as string)

    return response.status(200).json(message)
  }
}
