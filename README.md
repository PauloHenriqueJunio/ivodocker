# Projeto de Programação Web

[![Status: Ativo](https://img.shields.io/badge/status-ativo-green)](https://github.com/PauloHenriqueJunio/ivodocker)
[![Tecnologias](https://img.shields.io/badge/tecnologias-Node.js%2C%20Express%2C%20EJS%2C%20Sequelize%2C%20MySQL%2C%20Docker-blue)](https://github.com/PauloHenriqueJunio/ivodocker)

Este é um projeto de aplicação web FullStack desenvolvido para fins acadêmicos no IFAL. O objetivo principal foi criar uma aplicação web utilizando uma pilha de tecnologias modernas para gerenciar posts de um blog.

---

### 🚀 Funcionalidades

A aplicação contempla as seguintes funcionalidades principais:

* **Tela Inicial:** Uma página de conteúdo estático (`index.ejs`) sobre a história do mascote do Android.

* **Tela de Dados (CRUD):** Uma página para visualização e manutenção (Criação, Leitura, Atualização e Exclusão) de posts de um blog.

* **Formulário Reutilizável:** Um formulário para adicionar novos posts ou editar os existentes.

* **Autenticação:** Sistema de login e cadastro de usuários com `bcrypt`.

* **Navegação:** Menu de navegação para as principais seções da aplicação.

---

### 💻 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e ferramentas:

* **Node.js:** Ambiente de execução JavaScript.

* **Express.js:** Framework web para construir a API e as rotas.

* **EJS (Embedded JavaScript):** Engine de template para renderização de views HTML dinâmicas.

* **Sequelize:** ORM (Object-Relational Mapper) para Node.js.

* **MySQL:** Banco de dados relacional para persistência dos dados.

* **Docker & Docker Compose:** Ferramentas para orquestração de contêineres e gerenciamento do ambiente de desenvolvimento.

* **HTML5 & CSS3:** Linguagens de marcação e estilização.

---

### 📦 Estrutura do Projeto

A estrutura de pastas e arquivos do projeto está organizada da seguinte forma:
```bash
minha-app-crud/
├── config/
│   └── database.js
├── models/
│   ├── index.js
│   ├── Categoria.js
│   ├── Post.js
│   └── Usuario.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── imagens/
│       └── ...
├── routes/
│   ├── dados.js
│   └── index.js
├── views/
│   ├── layouts/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── dados.ejs
│   ├── formulario.ejs
│   └── index.ejs
├── app.js
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

### ⚙️ Como Executar o Projeto Localmente

Para rodar esta aplicação, é altamente recomendável usar o Docker para garantir que você tenha um ambiente consistente.

#### Pré-requisitos

* **Docker Desktop:** Certifique-se de ter o Docker Desktop instalado e em execução.

#### Passo a Passo

1. **Clone o repositório:**
```bash
   git clone [https://github.com/PauloHenriqueJunio/ivodocker.git](https://github.com/PauloHenriqueJunio/ivodocker.git)
   cd ivodocker
```
2. **Crie o arquivo de variáveis de ambiente:**
Copie o arquivo de exemplo e preencha com suas credenciais.

```bash
cp .env.example .env
```
Ou crie manualmente um arquivo ".env" com as variáveis:
```bash
DB_HOST=mysql_db
DB_USER=root
DB_PASSWORD=password
DB_NAME=dockerdb
```

Inicie os contêineres:
```bash
docker compose up --build
```
Este comando irá construir as imagens e iniciar o servidor e o banco de dados.

Você verá uma mensagem no terminal indicando que o servidor está rodando.

Acesse a aplicação:
Abra seu navegador e acesse as URLs abaixo:
```bash
Página Inicial: http://localhost:3000

Gerenciar Dados: http://localhost:3000/dados
```
---
###
🧑‍💻 <h2>**Autores:**</h2>

Paulo Henrique Junio dos Santos Lima

Lucas Pereira de Araujo

Gerson A. da Silva Neto

