import { container } from 'tsyringe'

import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { CategoriesRepository } from '@modules/categories/infra/prisma/CategoriesRepository'
import { ProductsRepository } from '@modules/products/infra/prisma/ProductsRepository'

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository)
