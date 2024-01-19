import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { AppError } from '@shared/errors/AppError'

export default {
  notFound(_req: Request, _res: Response, _next: NextFunction) {
    throw new AppError('Not found', 404)
  },

  globalErrors(error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof AppError) return res.status(error.statusCode).json(error)

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: {
          errors: error.issues.map(issue => issue.message),
          path: error?.errors.map(error => error.path)
        }
      })
    }

    console.log(error.stack)

    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
