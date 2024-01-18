import { IAppError } from '@core/types/utils/IAppError'

export class AppError implements IAppError {
  public readonly statusCode: number
  public readonly success: boolean
  public readonly message: string

  constructor (message: string, statusCode = 400) {
    this.success = false
    this.statusCode = statusCode
    this.message = message
  }
}
