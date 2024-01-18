import { z } from 'zod'

import * as validations from '../../validations/validationCategories'

export type IFindAllCategoriesDTO = z.infer<typeof validations.validationListCategories>
export type IUpdateCategoryDTO = z.infer<typeof validations.validationUpdateCategory>
export type ICreateCategoryDTO = z.infer<typeof validations.validationCreateCategory>
