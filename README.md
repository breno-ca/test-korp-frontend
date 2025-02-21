# Test Korp Frontend

Este é o frontend do projeto Test Korp, desenvolvido utilizando Angular.

## Tecnologias Utilizadas

- **Angular 16**
- **TypeScript**
- **Node.js 23**
- **HTML e CSS**

## Sobre o Projeto

### Arquitetura

Este projeto utiliza o padrão de arquitetura [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) para construção de interfaces web.

Os componentes das páginas públicas estão em app sendo elas:
- `public/`: para landing page.
- `auth/`: para autenticação e cadastro.

Os componentes das páginas privadas estão em:
- `dashboard/`: contendo a navbar para acesso as páginas privadas.
- `features/`: contendo os componentes das features

As features do projeto consistem em:
- `users/`: para gerenciamento de usuários.
- `customers/`: para gerenciamento de clientes.
- `orders/`: para gerenciamento de pedidos.
- `products/`: para gerenciamento de produtos.
- `suppliers/`: para gerenciamento de fornecedores.

### Configurações de Ambiente

O projeto consiste em um front-end para o backend do projeto [Test Korp Backend](https://github.com/breno-ca/test-korp-backend).

As variáveis de ambiente do projeto são definidas pelo gerenciador de environments do angular

O arquivo `environments/environment.development.ts` define as variáveis de ambiente para o ambiente de desenvolvimento.

## Como Executar

Este projeto é uma das partes do teste, este projeto deve ser executado preferencialmente pelo repositório backend via docker compose. Com isso todos os ambientes serão instalados e configurados corretamente em containers.

### Via docker compose

1. Clone o repositório do back-end:
    ```sh 
    git clone https://github.com/breno-ca/test-korp-backend.git
    ```

2. Execute o projeto:
    ```sh
    make compose
    ```

### Via local

Caso prefira rodar com as dependencias locais, execute os seguintes passos:

1. Instale as dependências:
    ```sh
    npm install -g @angular/cli@16
    ```
2. Execute o projeto:
    ```sh
    ng serve
    ```
3. Acesse em seu navegador: `http://localhost:4200`
