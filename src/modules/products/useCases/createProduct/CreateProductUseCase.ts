import { ICategoriesRepository } from '@modules/categories/domains/repositories/ICategoriesRepository'
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository'
import { validationCreateProduct } from '@modules/products/validations/validationProducts'
import { ICreateProductDTO } from '@modules/products/domains/DTOs/productsDTOs'
import { IProduct } from '@modules/products/domains/models/IProduct'
import { AppError } from '@shared/errors/AppError'

export class CreateProductUseCase {
  constructor(
    private readonly categoryRepository: ICategoriesRepository,
    private readonly productsRepository: IProductsRepository
  ) {}

  async execute(data: ICreateProductDTO): Promise<IProduct> {
    const valid_data = validationCreateProduct.parse(data)

    const category = await this.categoryRepository.show(valid_data.category_id)
    if (!category) throw new AppError('Category not found!')

    const productExist = await this.productsRepository.findAll({ name: valid_data.name, page_size: 1, page: 1 })
    if (productExist.results.length > 0) throw new AppError('Product already exists')

    return await this.productsRepository.create(valid_data)
  }
}
