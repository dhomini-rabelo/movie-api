# Documentação Front-end

## Links

- [Documentação Back-end](../backend/README.md)
- [Desafio](../README.md)

## Como executar o projeto

### Instalar as dependências

```bash
npm install
```


### Executar o projeto

```bash
npm run dev
```

## Organização do projeto

O projeto foi desenvolvido com React, eu não utilizei Next.js pois acabei reaproveitando um projeto que eu já tinha feito, e tive pouquíssimo tempo para desenvolver o projeto no front-end já que priorizei a parte do back-end, mesmo que que considere o Next incrível para desenvolvimento de aplicações React, gosto de utilizar server componentes, Suspense API, funcionalidades de cacheamento, layout e muito mais.


Escolhi utilizar o Styled Components para estilização dos componentes, pois acho que ele facilita a criação de componentes reutilizáveis e a manutenção do código, mas estou aberto
a utilizar qualquer outra biblioteca de estilização. Para forms utilizo a combinação de React-Hook-Form e Zod (tipagem avançada) para validação dos campos. Utilizei o zustand
para gerenciamento de estado para autenticação, pois é uma biblioteca muito simples de utilizar. Também utilizei tailwindcss para estilização, pois consigo desenvolver telas 
complexas de forma muito rápida.


Organização de pastas:

- **src**: Código fonte da aplicação
  - **app**: Código do layout da aplicação
    - **components**: Componentes reutilizáveis
    - **pages**: Páginas da aplicação
    - **assets**: Imagens, fontes, etc
    - **hooks**: Hooks customizados
    - **tokens**: Tokens de cores, espaçamentos, etc
    - **utils**: Funções utilitárias
  - **code**: Código utilizado para autenticação e autorização, e para fazer requisições para o back-end.
