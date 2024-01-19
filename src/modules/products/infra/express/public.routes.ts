import { Router } from 'express'

import { DeleteProductController } from '@modules/products/useCases/deleteProduct/DeleteProductController'
import { UpdateProductController } from '@modules/products/useCases/updateProduct/UpdateProductController'
import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController'
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController'
import { ShowProductController } from '@modules/products/useCases/showProduct/ShowProductController'

const deleteProductController = new DeleteProductController()
const updateProductController = new UpdateProductController()
const createProductController = new CreateProductController()
const listProductsController = new ListProductsController()
const showProductController = new ShowProductController()

const path_route = '/products'
const routes = Router()

routes
  .delete(path_route + '/:id', deleteProductController.handle)
  .patch(path_route + '/:id', updateProductController.handle)
  .get(path_route + '/:id', showProductController.handle)
  .post(path_route, createProductController.handle)
  .get(path_route, listProductsController.handle)

export { routes }
