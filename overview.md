# Overview do Projeto

## Sobre o Sistema

Sistema web para gerenciamento de uma biblioteca pessoal de livros. O usuário pode cadastrar, visualizar, editar e remover livros por meio de uma interface simples e intuitiva.

## Fluxo da Aplicação

### 1. Lista de Livros

Ao acessar a aplicação, o usuário é direcionado para a **página inicial**, que exibe todos os livros já cadastrados em formato de lista/grade.

- Cada card exibe as informações principais do livro (capa, título, autor)
- Caso não haja nenhum livro cadastrado, a lista aparece vazia

### 2. Cadastro de Novo Livro

Na página de lista, o usuário pode abrir o formulário de cadastro de um novo livro. Os seguintes campos são **obrigatórios**:

| Campo              | Tipo     | Observação                          |
|--------------------|----------|--------------------------------------|
| Título             | Texto    | Mínimo 3 caracteres                 |
| Autor              | Texto    | Mínimo 3 caracteres                 |
| Data de Publicação | Data     | —                                   |
| Descrição          | Texto    | Mínimo 10 caracteres                |
| Foto da Capa       | Imagem   | **Obrigatória** no novo cadastro    |

Após o cadastro, o livro aparece imediatamente na lista da página inicial.

### 3. Detalhes do Livro

Ao clicar em um livro na lista, o usuário é redirecionado para a **página de detalhes** daquele livro, onde pode visualizar todas as informações cadastradas, incluindo a imagem de capa.

### 4. Edição do Livro

Na página de detalhes, o usuário pode abrir o formulário de edição. O comportamento é semelhante ao cadastro, com uma diferença importante:

| Campo              | Edição         |
|--------------------|----------------|
| Título             | Obrigatório    |
| Autor              | Obrigatório    |
| Data de Publicação | Obrigatório    |
| Descrição          | Obrigatório    |
| Foto da Capa       | **Opcional** — se não for enviada uma nova imagem, a foto atual é mantida |

---

## Páginas

| Rota                  | Descrição                              |
|-----------------------|----------------------------------------|
| `/bookList`           | Listagem de todos os livros cadastrados |
| `/bookDetails/[id]`   | Detalhes e edição de um livro específico |

---

## Endpoints da API utilizados pelo Frontend

| Método   | Rota          | Ação                            |
|----------|---------------|---------------------------------|
| `GET`    | `/books`      | Busca todos os livros           |
| `GET`    | `/book/show/:id` | Busca os detalhes de um livro |
| `POST`   | `/books`      | Cria um novo livro (com imagem) |
| `PUT`    | `/book`       | Atualiza um livro (imagem opcional) |
| `DELETE` | `/book`       | Remove um livro pelo ID         |
