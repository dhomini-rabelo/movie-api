# Documentação Back-end

## Links

- [Documentação Front-end](../frontend/README.md)
- [Desafio](../README.md)

## Acesse as APIs via Insomnia (Importe o arquivo Insomnia.json)

- [Arquivo Insomnia](./Insomnia.json)

## Como executar o projeto

Eu deixei o arquivo .env configurado, um banco de dados simplificado com alguns dados 
e 2 usuários(simple@test.com que é um usuário simples e test@test.com que é um usuário admin),
então basta seguir os passos abaixo:

### Instalar as dependências
```bash
npm install
```

### Executar o projeto
```bash
npm run start:dev
```

### Executar os testes unitários
```bash
npm run test
```

### Executar os testes em modo watch

```bash	
npm run test:watch
```

## Organização do projeto

Eu utilizei os conceitos de DDD(Domain Driven Design) e Clean Architecture para organizar o projeto,
pois acredito que essa é a melhor forma para desenvolver qualquer projeto, pois dessa maneira conseguimos
isolar as regras de negócio, entidades, o core do nosso sistema, de toda a infraestrutura, como banco de dados,
frameworks, etc. Sendo possível trocar qualquer ferramenta do sistema de forma fácil, sem afetar o restante do sistema.

Eu criei testes automatizados utilizando TDD(Test Driven Development) para garantir o funcionamento,
a qualidade e a manutenibilidade do código. Criando uma base sólida para o projeto, um sistema fácil de 
adicionar novas funcionalidades, corrigir bugs e refatorar as regras de negócio.

Organização de pastas:

- **prisma**: Configuração de tabelas para o prisma, banco de dados sqlite e as migrations.
- **typings**: Hacks de tipagem para o typescript.
- **tests**: Algumas funções utilitárias para os testes, contrato para factories, e o mais importante, o InMemoryRepository,
             que é um repositório em memória para os testes, o que garante velocidade na execução dos testes, agilidade no desenvolvimento do projeto,
             e a garantia de que os testes não dependem de um banco de dados externo.
- **src**: Código fonte da aplicação
  - **adapter**: Camada Interface Adapters, onde ficam as implementações de interfaces para libs externas
  - **domain**: Camada de domínio da aplicação
    - **core**: Interfaces, contratos e ferramentas que serão utilizadas dentro dos bounded contexts
    - **bounded-contexts**: Contextos limitados
      - **auth**: Entidades, repositórios, casos de uso e testes do contexto de autenticação
      - **movie-app**: Entidades, repositórios, casos de uso e testes do contexto de filmes
  - **infra**: Camada de infraestrutura da aplicação contendo o framework, banco de dados que usaremos na aplicação back-end.
               O framework escolhido foi o NestJS, um framework que utiliza o conceito de módulos, injeção de dependências,
               fortemente tipado, e que utiliza conceitos do SOLID, facilitando a implementação de um sistema avançado, escalável e de fácil manutenção,
               utilizando POO(Programação Orientada a Objetos). Ele também é um framework opinado, o que traz algumas vantagens interessantes para esse projeto.
    - **adapters**: Camada de interface adapters também, mas para libs externas que serão utilizadas na infraestrutura, no caso a implementação de repositório com prisma.
                    Escolhi utilizar o prisma por ser um ORM moderno, fácil de utilizar, com uma documentação muito boa, e com uma tipagem forte, o que facilita a manutenção do código.
    - **core**: Configuração de variáveis de ambiente, módulos principal do Nest, o arquivo de inicialização da aplicação.
    - **http**: Camada de comunicação HTTP, controllers, pipes, presenters e módulo de autenticação.
    - **lib**: Ferramentas utilitárias para a aplicação
    - **services**: Serviços que serão utilizados na aplicação, como o serviço de configuração de variáveis de ambiente.
               


