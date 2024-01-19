import { z } from 'zod'

import { errors } from '@shared/errors/constants'

export const validationCreateProduct = z.object({
  price: z.number(errors.price_required).int(errors.price_int).positive(errors.price_positive),
  description: z.string().max(600, errors.description_max).min(3, errors.description_min),
  name: z.string().max(30, errors.name_max).min(3, errors.name_min),
  category_id: z.string().uuid(errors.id)
})

export const validationUpdateProduct = z.object({
  price: z.number(errors.price_required).int(errors.price_int).positive(errors.price_positive).optional(),
  description: z.string().max(600, errors.description_max).min(3, errors.description_min).optional(),
  name: z.string().max(30, errors.name_max).min(3, errors.name_min).optional(),
  category_id: z.string().uuid(errors.id).optional()
})

export const validationListProducts = z.object({
  name: z.string().max(30, errors.name_max).min(3, errors.name_min).optional(),
  category_id: z.string().uuid(errors.id).optional(),

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
