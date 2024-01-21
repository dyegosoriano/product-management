const { version } = require('../../../package.json')

const swaggerAutoGen = require('swagger-autogen')({ language: 'pt-BR', openapi: '3.1.0' })
const outputFile = './swagger_output.json'
const host = process.env.API_URL

const endpoints_files = [
  '../../modules/categories/infra/express/public.routes.ts',
  '../../modules/products/infra/express/public.routes.ts'
]

const doc = {
  info: { title: 'Product Management', description: '', version },
  schemes: ['http'],
  components: {},
  host,
  definitions: {
    ListProducts: {
      total_pages: 1,
      total: 3,
      page_size: 5,
      page: 1,
      results: [
        {
          id: 'a73c7f56-4b0a-46d8-9b34-c4d2fac85c39',
          name: 'produto 1705859613',
          description: 'Descrição de teste.',
          price: 100,
          category_id: 'e8488168-89b9-4d60-a4dd-bfaab677913c',
          updated_at: '2024-01-21T17:53:33.471Z',
          created_at: '2024-01-21T17:53:33.471Z'
        },
        {
          id: 'd0ffaede-3b45-4b00-9514-da94ea11deab',
          name: 'produto 1705859777',
          description: 'Descrição de teste.',
          price: 100000,
          category_id: 'e8488168-89b9-4d60-a4dd-bfaab677913c',
          updated_at: '2024-01-21T17:56:16.735Z',
          created_at: '2024-01-21T17:56:16.735Z'
        }
      ]
    },
    GetProduct: {
      id: '3f6cae85-0498-4b3b-a733-d0dba0a050b6',
      name: 'produto 1705860066',
      description: 'Descrição de teste.',
      price: 100000,
      category_id: 'e8488168-89b9-4d60-a4dd-bfaab677913c',
      updated_at: '2024-01-21T18:01:06.315Z',
      created_at: '2024-01-21T18:01:06.315Z'
    },
    CreateProduct: {
      name: 'produto 1705860066',
      description: 'Descrição de teste.',
      price: 100000,
      category_id: 'e8488168-89b9-4d60-a4dd-bfaab677913c'
    },
    GetProductInstallment: {
      id: 'a73c7f56-4b0a-46d8-9b34-c4d2fac85c39',
      name: 'produto 1705859613',
      description: 'Descrição de teste.',
      price: 100,
      category_id: 'e8488168-89b9-4d60-a4dd-bfaab677913c',
      updated_at: '2024-01-21T17:53:33.471Z',
      created_at: '2024-01-21T17:53:33.471Z',
      installment: 50.88
    },
    GetCategory: {
      id: 'beb60705-429c-44b3-aab0-dbce2d4fc99d',
      name: 'categotia 1705862517',
      percentage: 0.1,
      updated_at: '2024-01-21T18:41:57.543Z',
      created_at: '2024-01-21T18:41:57.543Z'
    },
    CreateCategory: {
      name: 'categotia 1705862517',
      percentage: 0.1
    },
    ListCategories: {
      total_pages: 1,
      total: 3,
      page_size: 5,
      page: 1,
      results: [
        {
          id: 'beb60705-429c-44b3-aab0-dbce2d4fc90d',
          name: 'categotia 1705517',
          percentage: 0.1,
          updated_at: '2024-01-21T18:41:57.543Z',
          created_at: '2024-01-21T18:41:57.543Z'
        },
        {
          id: 'beb60705-429c-44b3-aab0-dbce2d4fc99d',
          name: 'categotia 1705862',
          percentage: 0.1,
          updated_at: '2024-01-21T18:41:57.543Z',
          created_at: '2024-01-21T18:41:57.543Z'
        }
      ]
    }
  }
}

swaggerAutoGen(outputFile, endpoints_files, doc)
