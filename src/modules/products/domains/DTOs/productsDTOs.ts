import { z } from 'zod'

import * as validations from '../../validations/validationProducts'

export type IFindAllProductsDTO = z.infer<typeof validations.validationListProducts>
export type IUpdateProductDTO = z.infer<typeof validations.validationUpdateProduct>
export type ICreateProductDTO = z.infer<typeof validations.validationCreateProduct>
