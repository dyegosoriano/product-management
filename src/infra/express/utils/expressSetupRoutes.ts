import { Application } from 'express'
import filesystem from 'node:fs'
import path from 'node:path'

const is_dev = process.env.NODE_ENV === 'development'

const path_dev = path.resolve(__dirname, '..', '..', '..', 'modules')
const path_prod = path.resolve(__dirname, '..', 'modules')

const file_extension = is_dev ? '.routes.ts' : '.routes.js'

export const expressSetupRoutes = (app: Application) => {
  const directory = is_dev ? path_dev : path_prod

  filesystem.readdirSync(directory).forEach(file_or_dir => {
    const filePath = path.resolve(directory, file_or_dir)

    if (filesystem.statSync(filePath).isDirectory() && file_or_dir !== 'node_modules') {
      const route_path = path.join(filePath, 'infra/express')

      if (filesystem.statSync(route_path).isDirectory()) {
        filesystem
          .readdirSync(route_path)
          .filter(file => file.endsWith(file_extension))
          .forEach(file => {
            const { routes } = require(path.join(route_path, file))
            app.use('/', routes)
          })
      }
    }
  })
}
