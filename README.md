Guia de Iniciação Rápida

Este guia explica como configurar e rodar a aplicação localmente usando Docker Compose. A aplicação utiliza Node.js, Express e MySQL


Configuração Inicial

    Crie o arquivo .env: Na pasta raiz do projeto, crie um arquivo chamado .env e adicione as variáveis de ambiente necessárias. Este arquivo é crucial para a conexão com o banco de dados.

    DB_HOST=mysql_db
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=dockerdb


    Verifique a estrutura do projeto: Certifique-se de que a estrutura de pastas e arquivos está correta, conforme o que foi discutido.



Como Rodar a Aplicação

    Inicie os contêineres: Abra o terminal na pasta raiz do seu projeto e execute o comando abaixo. O Docker irá construir as imagens e iniciar os serviços do banco de dados e da sua aplicação.

    docker-compose up --build

    Acesse a aplicação: Após a inicialização, a aplicação estará disponível em seu navegador.

        Página inicial: http://localhost:3000

        Página de dados: http://localhost:3000/dados

