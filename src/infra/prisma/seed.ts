import { PrismaClient } from '@prisma/client'

import { Category } from '@modules/categories/entities/Category'

const categories = [
  { percentage: 0.025, name: 'automotive' },
  { percentage: 0.01, name: 'furniture' },
  { percentage: 0.05, name: 'computing' }
]

const prisma = new PrismaClient()

async function main() {
  try {
    for await (const item of categories) {
      const category = new Category() as any
      Object.assign(category, { ...item })

      const admin = await prisma.categories.upsert({
        where: { name: category.name },
        create: category,
        update: category
      })
    }

    await prisma.$disconnect()
  } catch (error) {
    console.error(error)

    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
