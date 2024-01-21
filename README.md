# Documentação Product Management back-end

Esta documentação descreve informações essenciais sobre a API Node.js do projeto.

## Estrutura de diretórios

```
├── src/
│ ├── core/               # Possui arquivos que serão usados em toda API.
│ │ └── types/            # Diretório com tipagens usadas na estrutura do projeto.
│ ├── infra/              # Controladores da API.
│ │ ├── express/          # Diretório responsável por todas as configurações do Express.
│ │ ├── prisma/           # Diretório com as conexões com banco de dados.
│ │ ├── swagger/          # Diretório responsável pela configuração da documentação.
│ │ └── server.ts/        # Arquivo responsável por levantar uma instância da API.
│ ├── modules/            # Diretório contendo todos os módulos de serviços.
│ │ └── module/           # Diretório exemplificando um mudulo(catagories, products).
│ │   ├── domains/        # Diretório contendo as tipagens dos domínios que serão usados no modulo.
│ │   ├── entities/       # Diretório contendo as classes que representam as entidades do banco de dados.
│ │   ├── infra/          # Diretório contendo a camada de infraestrutura de cada módulo (express, prisma).
│ │   ├── useCases/       # Diretório contendo os casos de uso e controllers do módulo.
│ │   └── validations/    # Diretório contendo as schemes de validação dos casos de usos.
│ └── shared/             # Configuração do banco de dados
│     ├── container/      # Diretório contendo todas as injeções de dependências usadas na API.
│     ├── erros/          # Diretório contendo arquivos com as classes de erros.
│     └── utils/          # Funções utilitárias.
├── .docker/              # Diretório com receitas de imagens do docker e docker compose
├── prisma/               # Diretório que centraliza todas as migrations e conexões com banco de dados usando Prisma ORM
├── misc/                 # Documentação do insomnia
├── tmp/                  # Diretório para arquivos temporários
├── .env.example          # Exemplo de arquivo .env
├── jest.config.ts        # Configuração do Jest
├── jest.setup.ts         # Configuração de importações do Jest
├── docker-compose.yml    # Atalho da configuração do Docker Compose
├── Dockerfile            # Atalho da configuração do Docker
└── package.json          # Dependências e scripts
```

## Tecnologias utilizadas

- [Node.js](https://nodejs.org) - Ambiente de execução JavaScript do lado do servidor.
- [Docker](https://www.docker.com) - Plataforma para criar e executar aplicativos em contêineres.
- [Docker Compose](https://docs.docker.com/compose) - Ferramenta para definir e executar aplicativos Docker multi-container.
- [Express](https://expressjs.com) - Framework web rápido, flexível e minimalista para Node.js.
- [@prisma/client](https://www.prisma.io/client) - Cliente de banco de dados ORM para Node.js.
- [Jest](https://jestjs.io) - Framework de testes em JavaScript.
- [dotenv](https://github.com/motdotla/dotenv) - Módulo para carregar variáveis de ambiente de um arquivo `.env`.
- [tsyringe](https://github.com/microsoft/tsyringe) - Contêiner de injeção de dependência leve para TypeScript.
- [Zod](https://github.com/colinhacks/zod) - Biblioteca para validação de esquemas.

## Pré-Requisitos

Certifique-se de ter as seguintes dependências instaladas em sua máquina:

- Docker Compose (Utilizado para criar o ambiente de desenvolvimento)
- Docker (Para ser utilizado no ambiente de produção)
- Node.js (versão v18 ou superior)
- Yarn (versão v1.22.19 ou superior)

## Configuração

1. Certifique-se de ter o Node.js, Docker e Docker Compose instalado em sua máquina.
2. Clone este repositório em seu ambiente local:
3. Navegue até o diretório do projeto
4. Instale as dependências para desenvolvimento: `yarn`
5. Renomeie o arquivo `.env.example` para `.env` e atualize as variáveis de ambiente.

## Executando o projeto em ambiente de desenvolvimento

1. Na raiz do diretório execute o comando `docker compose up --build` para criar todo o ambiente de desenvolvimento (Banco de dados e API).
2. O desenvolvimento será feito pelo docker com refresh a cada alteração de código dentro do container.
3. Acesse a porta que foi definida na variável de ambiente `PORT`.

## Ciando imagem do container para produção

1. Na raiz do diretório execute o comando `docker build -t pm-api .` para criar uma imagem docker da API.
2. Rode o seguinte comando `docker run --name pm -d -p 3333:3333 pm-api` para subir o container.

## Considerações adicionais

É importante que use a o docker para manter a maior fidelidade possível do ambiente de desenvolvimento para o ambiente de produção.
