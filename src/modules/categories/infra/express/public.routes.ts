import { Router, Request, Response } from 'express'

const path_route = '/categories'
const routes = Router()

routes.get(path_route, (_reques: Request, response: Response) => {
  response.send('Route categories')
})

export { routes }
