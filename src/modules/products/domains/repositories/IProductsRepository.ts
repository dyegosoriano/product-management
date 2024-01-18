import { IFindAllResults } from '@core/types/utils/IFindAllResults'

import { IProduct } from '../models/IProduct'

import * as productsDTOs from '../DTOs/productsDTOs'

export interface IProductsRepository {
  create(data: productsDTOs.ICreateProductDTO): Promise<IProduct>
  update(id: string, data: productsDTOs.IUpdateProductDTO): Promise<IProduct>
  show(id: string): Promise<IProduct>
  delete(id: string): Promise<void>
  findAll(data: productsDTOs.IFindAllProductsDTO): Promise<IFindAllResults<IProduct>>
}
