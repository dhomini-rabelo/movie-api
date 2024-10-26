# Desafio Técnico Storm


## Links

- [Documentação Front-end](./frontend/README.md)
- [Documentação Back-end](./backend/README.md)


## Desafio

Cadastro de usuários com 2 níveis, Usuário e Admin; Usuários/Login de acesso:

- Usuário: Cadastro, Edição e Exclusão lógica (Desativação)
- Admin: Cadastro, Edição e Exclusão lógica (Desativação)
- Somente usuário administrador pode cadastrar novos usuários.
- Filmes:
  - Cadastro (Somente um usuário administrador poderá realizar esse cadastro)
  - Voto (A contagem dos votos será feita por usuário de 0-4 que indica quanto o usuário gostou do filme)
  - Listagem (deverá ter filtro por diretor, nome, gênero e/ou atores)
  - Detalhe do filme trazendo todas as informações sobre o filme, inclusive a média dos votos

- Requisitos de tecnologia
  - Implementar autenticação e deverá seguir o padrão JWT, lembrando que o token a ser recebido deverá ser no formato Bearer
  - Bancos relacionais permitidos: MySQL, SQLite e Postgres
  - Sua API deverá ser Restful.
  - Sugerimos o uso de React no frontend
  - Sugerimos o uso de Node no backend
 
- Itens a serem avaliados
  - Estrutura/Arquitetura do projeto
  - Segurança do projeto, como autenticação, estratégia para senhas salvas no banco, SQL Injection e outros
  - Boas práticas da Linguagem/Framework
  - Seu projeto deverá seguir tudo o que foi exigido na seção [O que desenvolver?]
  - Migrations para a criação das tabelas do banco de dados
  - Simplicidade de execução do projeto
  - Testes
  - Documentação do projeto



