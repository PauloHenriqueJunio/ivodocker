Projeto de Programação Web
Este é um projeto de aplicação web FullStack desenvolvido para a disciplina de Programação Web (PWEB) no IFAL. O objetivo principal foi criar uma aplicação web utilizando uma pilha de tecnologias modernas para gerenciar posts de um blog.

🚀 Funcionalidades
A aplicação contempla as seguintes funcionalidades principais:

Tela Inicial: Uma página de conteúdo estático (index.ejs) sobre a história do mascote do Android.

Tela de Dados (CRUD): Uma página para visualização e manutenção (Criação, Leitura, Atualização e Exclusão) de posts de um blog.

Formulário Reutilizável: Um formulário para adicionar novos posts ou editar os existentes.

Autenticação: Sistema de login e cadastro de usuários com bcrypt.

Navegação: Menu de navegação para as principais seções da aplicação.

💻 Tecnologias Utilizadas
Este projeto foi construído com as seguintes tecnologias e ferramentas:

Node.js: Ambiente de execução JavaScript.

Express.js: Framework web para construir a API e as rotas.

EJS (Embedded JavaScript): Engine de template para renderização de views HTML dinâmicas.

Sequelize: ORM (Object-Relational Mapper) para Node.js.

MySQL: Banco de dados relacional para persistência dos dados.

Docker & Docker Compose: Ferramentas para orquestração de contêineres e gerenciamento do ambiente de desenvolvimento.

HTML5 & CSS3: Linguagens de marcação e estilização.

📦 Estrutura do Projeto
A estrutura de pastas e arquivos do projeto está organizada da seguinte forma:

minha-app-crud/
├── config/             # Configurações da aplicação
│   └── database.js
├── models/             # Modelos do Sequelize
│   ├── index.js
│   ├── Categoria.js
│   ├── Post.js
│   └── Usuario.js
├── public/             # Arquivos estáticos (CSS, imagens, etc.)
│   ├── css/
│   │   └── style.css
│   └── imagens/
│       └── ...
├── routes/             # Rotas da API
│   ├── dados.js
│   └── index.js
├── views/              # Templates EJS
│   ├── layouts/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── dados.ejs
│   ├── formulario.ejs
│   └── index.ejs
├── app.js              # Arquivo principal do servidor
├── Dockerfile          # Instruções para construir a imagem Docker
├── docker-compose.yml  # Configuração do Docker Compose
└── .env.example        # Exemplo de arquivo de variáveis de ambiente

⚙️ Como Executar o Projeto Localmente
Para rodar esta aplicação, é altamente recomendável usar o Docker para garantir que você tenha um ambiente consistente.

Pré-requisitos
Docker Desktop: Certifique-se de ter o Docker Desktop instalado e em execução.

Passo a Passo
Clone o repositório:

git clone [https://github.com/PauloHenriqueJunio/ivodocker.git](https://github.com/PauloHenriqueJunio/ivodocker.git)
cd ivodocker

Crie o arquivo de variáveis de ambiente:
Copie o arquivo de exemplo e preencha com suas credenciais.

cp .env.example .env

(Ou crie manualmente um arquivo .env com as variáveis que você me enviou).

Inicie os contêineres:
Este comando irá construir as imagens e iniciar o servidor e o banco de dados.

docker compose up --build

Você verá uma mensagem no terminal indicando que o servidor está rodando.

Acesse a aplicação:
Abra seu navegador e acesse as URLs abaixo:

Página Inicial: http://localhost:3000

Gerenciar Dados: http://localhost:3000/dados

🧑‍💻 Autores
Paulo Henrique Junio dos Santos Lima

Lucas Pereira de Araujo

Gerson A. da Silva Neto
