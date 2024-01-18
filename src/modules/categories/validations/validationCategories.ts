import { z } from 'zod'

import { errors } from '@shared/errors/constants'

export const validationCreateCategory = z.object({
  name: z.string().max(100, errors.name_max).min(3, errors.name_min)
})

export const validationUpdateCategory = z.object({
  name: z.string().max(100, errors.name_max).min(3, errors.name_min).optional()
})

export const validationListCategories = z.object({
  name: z.string().max(100, errors.name_max).min(3, errors.name_min).optional(),

  page_size: z
    .string(errors.pagination_required)
    .regex(/[1-9]+/, errors.pagination)
    .transform(number => +number)
    .or(z.number(errors.pagination_required).int(errors.pagination_int).positive(errors.pagination_positive)),

  page: z
    .string(errors.pagination_required)
    .regex(/[1-9]+/, errors.pagination)
    .transform(number => +number)
    .or(z.number(errors.pagination_required).int(errors.pagination_int).positive(errors.pagination_positive))
})
