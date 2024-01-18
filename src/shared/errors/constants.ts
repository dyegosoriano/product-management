export const errors = {
  name_required: { required_error: 'Required name.' },
  name_max: 'Name must be at most 100 characters',
  name_min: 'Name must be at least 3 characters',

  description_required: { required_error: 'Required description.' },
  description_max: 'Description must be at most 600 characters',
  description_min: 'Description must be at least 3 characters',

  pagination_required: { required_error: 'Pagination values are mandatory.' },
  pagination: 'The value 0 is not accepted in pagination.',
  pagination_positive: 'Enter only positive values.',
  pagination_int: 'Enter only integer values.',

  price_required: { required_error: 'Price values are mandatory.' },
  price_positive: 'Enter only positive values.',
  price_int: 'Enter only integer values.',

  boolean_invalid: { message: "You need to enter a 'true' or 'false' value." },

  required_field: { required_error: 'Required field' },

  id: 'Invalid ID!'
}
