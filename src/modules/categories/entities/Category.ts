import { v4 as uuid } from 'uuid'

import { ICategory } from '../domains/models/ICategory'

export class Category implements ICategory {
  id: string

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
