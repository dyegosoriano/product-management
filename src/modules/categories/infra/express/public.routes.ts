import { Router } from 'express'

import { ListCategoriesController } from '@modules/categories/useCases/listCategories/ListCategoriesController'
import { DeleteCategoryController } from '@modules/categories/useCases/deleteCategory/DeleteCategoryController'
import { CreateCategoryController } from '@modules/categories/useCases/createCategory/CreateCategoryController'
import { UpdateCategoryController } from '@modules/categories/useCases/updateCategory/UpdateCategoryController'
import { ShowCategoryController } from '@modules/categories/useCases/showCategory/ShowCategoryController'

const listCategoriesController = new ListCategoriesController()
const createCategoryController = new CreateCategoryController()
const deleteCategoryController = new DeleteCategoryController()
const updateCategoryController = new UpdateCategoryController()
const showCategoryController = new ShowCategoryController()

const routes = Router()

routes
  .post(
    '/categories',
    createCategoryController.handle
    /*
      #swagger.tags = ['Categorias']
      #swagger.description = 'Rota para criação da categoria.'
      #swagger.parameters['obj'] = { schema: { $ref: '#/definitions/CreateCategory' } }
      #swagger.responses[200] = { schema: { $ref: '#/definitions/GetCategory' } }
    */
  )

  .patch(
    '/categories/:id',
    updateCategoryController.handle
    /*
      #swagger.tags = ['Categorias']
      #swagger.description = 'Rota para atualização da categoria.'
      #swagger.parameters['obj'] = { schema: { $ref: '#/definitions/CreateCategory' } }
      #swagger.responses[200] = { schema: { $ref: '#/definitions/GetCategory' } }
    */
  )

  .get(
    '/categories/:id',
    showCategoryController.handle
    /*
      #swagger.tags = ['Categorias']
      #swagger.description = 'Rota para exibição da categoria.'
      #swagger.responses[200] = { schema: { $ref: '#/definitions/GetCategory' } }
    */
  )

  .get(
    '/categories',
    listCategoriesController.handle
    /*
      #swagger.tags = ['Categorias']
      #swagger.description = 'Rota para listagem das categorias.'
      #swagger.parameters['page_size'] = { in: 'path', type: 'integer', description: 'Tamanho da página.' }
      #swagger.parameters['page'] = { in: 'path', type: 'integer', description: 'Página a ser exibida.' }
      #swagger.parameters['name'] = { in: 'path', type: 'string', description: 'Busca pelo nome da categoria.' }
      #swagger.responses[200] = { schema: { $ref: '#/definitions/ListCategories' } }
    */
  )

  .delete(
    '/categories/:id',
    deleteCategoryController.handle
    /*
      #swagger.tags = ['Categorias']
      #swagger.description = 'Rota para remoção da categoria.'
      #swagger.responses[200] = { schema: { $message: 'Category removed successfully!' } }
    */
  )

export { routes }
