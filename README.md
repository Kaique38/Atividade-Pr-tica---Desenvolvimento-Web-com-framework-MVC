# Cadastro de Produtos — MVC

## Integrante

Nome: **Kaique Mariano da Silva de Oliveira**  
RM: **20260508**

## Como executar

1. Instale o [Node.js](https://nodejs.org/).
2. Na pasta do projeto, instale as dependências:

   ```bash
   npm install
   ```

3. Inicie a aplicação:

   ```bash
   npm start
   ```

4. Acesse `http://localhost:3000` no navegador.

O banco de dados SQLite fica em `database.sqlite`. Na inicialização, a aplicação cria as tabelas necessárias e inclui categorias iniciais se ainda não houver nenhuma.

## Funcionalidades

- Cadastro, listagem, edição e exclusão de produtos.
- Cadastro, listagem, edição e exclusão de categorias.
- Associação obrigatória de cada produto a uma categoria.
- Consulta dos produtos de uma categoria.
- Pesquisa de produtos por nome, incluindo termos parciais.

## Desafios

- **Categorias e relacionamento:** os Models `Categoria` e `Produto` são relacionados como um para muitos. Cada produto guarda `categoriaId` e pertence a uma categoria.
- **Produtos por categoria:** a rota `GET /produtos/categoria/:id` busca a categoria pelo ID e usa `Produto.findAll()` com a condição `where: { categoriaId: categoria.id }`.
- **Pesquisa por nome:** a rota `GET /produtos?busca=termo` usa `Op.like` e o padrão `%termo%` para localizar o texto em qualquer trecho do nome do produto.
