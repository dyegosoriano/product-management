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

const path_route = '/categories'
const routes = Router()

routes
  .delete(path_route + '/:id', deleteCategoryController.handle)
  .patch(path_route + '/:id', updateCategoryController.handle)
  .get(path_route + '/:id', showCategoryController.handle)
  .post(path_route, createCategoryController.handle)
  .get(path_route, listCategoriesController.handle)

export { routes }
