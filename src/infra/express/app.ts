import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import express, { Application } from 'express'
import swaggerUI from 'swagger-ui-express'
import helmet from 'helmet'

import '@shared/container'
import { expressSetupRoutes } from './utils/expressSetupRoutes'
import swaggerFile from '../swagger/swagger_output.json'
import errorHandling from './middlewares/errorHandling'

export class AppServer {
  private readonly server: Application

  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.errorsHandler()
  }

  start(port: number, callback?: Function) {
    return this.server.listen(port, () => {
      console.info(`🚀 Server is running port: ${port}`)
      console.info(`Worker started pid: ${process.pid}`)

      if (callback) callback(process.pid)
    })
  }

  private errorsHandler() {
    this.server.use(errorHandling.notFound)
    this.server.use(errorHandling.globalErrors)
  }

  private middlewares() {
    this.server.disable('x-powered-by')
    this.server.use(helmet())

    this.server.use(express.json())
  }

  private routes() {
    this.server.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile, { explorer: true }))
    expressSetupRoutes(this.server)
  }
}
