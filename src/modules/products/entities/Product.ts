import { v4 as uuid } from 'uuid'

import { IProduct } from '../domains/models/IProduct'

export class Product implements IProduct {
  id: string

  description: string
  category_id: string
  price: number
  name: string

  updated_at: Date
  created_at: Date

  constructor() {
    if (!this.id) {
      this.created_at = new Date()
      this.updated_at = new Date()
      this.id = uuid()
    }
  }
}
