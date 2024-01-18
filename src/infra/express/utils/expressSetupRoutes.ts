import { Application } from 'express'
import filesystem from 'node:fs'
import path from 'node:path'

export const expressSetupRoutes = (app: Application) => {
  const directory = path.resolve(__dirname, '..', '..', '..', 'modules')

  filesystem.readdirSync(directory).forEach(file_or_dir => {
    const filePath = path.resolve(directory, file_or_dir)

    if (filesystem.statSync(filePath).isDirectory() && file_or_dir !== 'node_modules') {
      const route_path = path.join(filePath, 'infra/express')

      if (filesystem.statSync(route_path).isDirectory()) {
        filesystem
          .readdirSync(route_path)
          .filter(file => file.endsWith('.routes.ts'))
          .forEach(file => {
            const { routes } = require(path.join(route_path, file))
            app.use('/', routes)
          })
      }
    }
  })
}
