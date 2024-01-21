import { Router } from 'express'

import { ShowProductInstallmentController } from '@modules/products/useCases/ShowProductInstallment/ShowProductInstallmentController'
import { DeleteProductController } from '@modules/products/useCases/deleteProduct/DeleteProductController'
import { UpdateProductController } from '@modules/products/useCases/updateProduct/UpdateProductController'
import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController'
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController'
import { ShowProductController } from '@modules/products/useCases/showProduct/ShowProductController'

const showProductInstallmentController = new ShowProductInstallmentController()
const deleteProductController = new DeleteProductController()
const updateProductController = new UpdateProductController()
const createProductController = new CreateProductController()
const listProductsController = new ListProductsController()
const showProductController = new ShowProductController()

const routes = Router()

routes
  .post(
    '/products',
    createProductController.handle
    /*
      #swagger.tags = ['Produtos']
      #swagger.description = 'Rota para criação do produto.'
      #swagger.parameters['obj'] = { schema: { $ref: '#/definitions/CreateProduct' } }
      #swagger.responses[200] = { schema: { $ref: '#/definitions/GetProduct' } }
    */
  )

  .patch(
    '/products/:id',
    updateProductController.handle
    /*
      #swagger.tags = ['Produtos']
      #swagger.description = 'Rota para atualização do produto.'
      #swagger.parameters['obj'] = { schema: { $ref: '#/definitions/CreateProduct' } }
      #swagger.responses[200] = { schema: { $ref: '#/definitions/GetProduct' } }
    */
  )

  .get(
    '/products/:id',
    showProductController.handle
    /*
      #swagger.tags = ['Produtos']
      #swagger.description = 'Rota para exibição do produto.'
      #swagger.responses[200] = { schema: { $ref: '#/definitions/GetProduct' } }
    */
  )

  .get(
    '/products',
    listProductsController.handle
    /*
      #swagger.tags = ['Produtos']
      #swagger.description = 'Rota para listagem dos produtos.'
      #swagger.parameters['category_id'] = { in: 'path', type: 'string', description: 'Busca pelo id da categoria.' }
      #swagger.parameters['name'] = { in: 'path', type: 'string', description: 'Busca pelo nome do produto.' }
      #swagger.parameters['page_size'] = { in: 'path', type: 'integer', description: 'Tamanho da página.' }
      #swagger.parameters['page'] = { in: 'path', type: 'integer', description: 'Página a ser exibida.' }
      #swagger.responses[200] = { schema: { $ref: '#/definitions/ListProducts' } }
    */
  )

  .post(
    '/products/installment',
    showProductInstallmentController.handle
    /*
      #swagger.tags = ['Produtos']
      #swagger.description = 'Rota para exibição do produto com calculo das parcelas.'
      #swagger.parameters['obj'] = { in: 'body', schema: { "$product_id": "a73c7f56-4b0a-46d8-9b34-c4d2fac85c39", "$fees": 10 } }
      #swagger.responses[200] = { schema: { $ref: '#/definitions/GetProductInstallment' } }
    */
  )

  .delete(
    '/products/:id',
    deleteProductController.handle
    /*
      #swagger.tags = ['Produtos']
      #swagger.description = 'Rota para remoção do produto.'
      #swagger.responses[200] = { schema: { $message: 'Product removed successfully!' } }
    */
  )

export { routes }
