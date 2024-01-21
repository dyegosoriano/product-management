import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ShowProductInstallmentUseCase } from './ShowProductInstallmentUseCase'

export class ShowProductInstallmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showProductInstallmentUseCase = container.resolve(ShowProductInstallmentUseCase)
    const product = await showProductInstallmentUseCase.execute(request.body)

    return response.status(200).json(product)
  }
}
