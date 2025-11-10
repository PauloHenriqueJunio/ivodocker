# Projeto de Programação Web - Blog com Docker

[![Status: Ativo](https://img.shields.io/badge/status-ativo-green)](https://github.com/PauloHenriqueJunio/ivodocker)
[![Tecnologias](https://img.shields.io/badge/tecnologias-Node.js%2C%20Express%2C%20Sequelize%2C%20MySQL%2C%20Docker-blue)](https://github.com/PauloHenriqueJunio/ivodocker)

Este é um projeto de aplicação web FullStack desenvolvido para fins acadêmicos. O objetivo principal foi criar um blog funcional, com autenticação e gerenciamento de posts, utilizando uma pilha de tecnologias modernas e totalmente conteinerizado com Docker.

---

### 🚀 Funcionalidades

* **Gerenciamento de Posts (CRUD):** Sistema completo para Criar, Ler, Atualizar e Excluir postagens.
* **Autenticação de Usuários:** Páginas de cadastro e login, com armazenamento seguro de senhas (bcrypt) e gerenciamento de sessão.
* **Sistema de Categorias:** Associação de posts a categorias pré-definidas.
* **Ambiente Padronizado:** Uso de Docker, Docker Compose e Devcontainer para garantir um ambiente de desenvolvimento e execução consistente e de fácil configuração.

---

### 💻 Tecnologias Utilizadas

* **Backend:** Node.js com Express.js
* **Frontend:** EJS (Embedded JavaScript) para renderização de views no servidor.
* **Banco de Dados:** MySQL 8.0
* **ORM:** Sequelize para mapeamento objeto-relacional.
* **Logging:** Winston para logs estruturados, seguindo as práticas do 12-Factor App.
* **Containerização:** Docker, Docker Compose
* **Ambiente de Desenvolvimento:** VS Code Dev Containers

---

### 📦 Estrutura do Projeto

A estrutura de pastas e arquivos do projeto está organizada da seguinte forma:

```bash
.
├── .devcontainer/
│   └── devcontainer.json
├── config/
│   ├── database.js
│   └── logger.js
├── models/
│   ├── Categoria.js
│   ├── Comentario.js
│   ├── index.js
│   ├── Post.js
│   └── Usuario.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── imagens/
├── routes/
│   ├── auth.js
│   ├── dados.js
│   └── index.js
├── views/
│   ├── layouts/
│   │   ├── footer.ejs
│   │   └── header.ejs
│   ├── cadastro.ejs
│   ├── dados.ejs
│   ├── formulario.ejs
│   ├── index.ejs
│   └── login.ejs
├── .env
├── app.js
├── criar_categorias.js
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

*(Observação: Os arquivos `Fabricante.js` e `Item.js` são legados de uma versão anterior do projeto).*

---

### 🔧 Configuração Inicial Obrigatória

Antes de iniciar o projeto, é necessário criar um arquivo de configuração local com as variáveis de ambiente.

1.  **Crie o arquivo `.env`:**
    Na raiz do projeto, faça uma cópia do arquivo `.env.example` e renomeie a cópia para `.env`.

2.  **Preencha as variáveis:**
    Abra o novo arquivo `.env` e substitua `SUA_SENHA_AQUI` pela senha que você deseja usar para o banco de dados (por padrão, pode ser `password`, conforme o `docker-compose.yml`).

---
### 🚀 Ambiente de Desenvolvimento com Devcontainer (Recomendado)

Esta é a forma **recomendada** para desenvolver no projeto. O Devcontainer cria um ambiente completo e padronizado dentro do Docker, com todas as ferramentas (Node.js, Git) e extensões do VS Code necessárias já instaladas.

#### Pré-requisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Visual Studio Code](https://code.visualstudio.com/)
* A extensão **[Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)** da Microsoft no VS Code.

#### Como Iniciar o Ambiente
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/PauloHenriqueJunio/ivodocker.git](https://github.com/PauloHenriqueJunio/ivodocker.git)
    cd ivodocker
    ```

2.  **Abra a pasta do projeto no VS Code.**

3.  O VS Code detectará a configuração do Devcontainer e mostrará uma notificação. Clique em **"Reopen in Container"**.

4.  **Aguarde a construção do ambiente.** Na primeira vez, pode demorar alguns minutos.

5.  **Pronto!** Seu VS Code estará conectado ao contêiner. Para iniciar a aplicação, abra o terminal integrado (`Ctrl + '`) e rode:
    ```bash
    node app.js
    ```
    Acesse o site em `http://localhost:3000`.

---

### ⚙️ Executando Apenas com Docker Compose (Alternativo)

Se você deseja apenas **rodar** a aplicação sem o ambiente de desenvolvimento do VS Code, siga os passos abaixo.

#### Pré-requisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

#### Passo a Passo

1.  **Clone o repositório** (se ainda não o fez).

2.  **Crie o arquivo de variáveis de ambiente:** Na raiz do projeto, crie um arquivo chamado `.env` e copie o conteúdo abaixo para ele.
    ```env
    DB_HOST=mysql_db
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=dockerdb
    ```

3.  **Inicie os contêineres:** No seu terminal, na raiz do projeto, execute:
    ```bash
    docker compose up --build
    ```
    Este comando irá construir as imagens e iniciar o servidor e o banco de dados.

4.  **Acesse a aplicação:** Abra seu navegador e acesse `http://localhost:3000`.

---

## Como acessar o ArgoCD

### Pré-requisitos
Certifique-se de que você possui os seguintes itens instalados:

1. **kubectl**: Ferramenta de linha de comando para interagir com o Kubernetes.
   - Instale com o comando:
     ```bash
     sudo snap install kubectl --classic
     ```

2. **Minikube** (se estiver usando um cluster local):
   - Instale com os comandos:
     ```bash
     curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
     sudo install minikube-linux-amd64 /usr/local/bin/minikube
     ```

3. **Acesso ao cluster Kubernetes**: Certifique-se de que o cluster está rodando e configurado corretamente.
   - Para iniciar o Minikube:
     ```bash
     minikube start
     ```

### Passos para acessar o ArgoCD

1. **Verifique os pods do ArgoCD**:
   Certifique-se de que todos os pods estão no estado `Running`:
   ```bash
   kubectl get pods -n argocd
   ```

2. **Exponha o serviço do ArgoCD**:
   Use o comando abaixo para expor o serviço `argocd-server` localmente:
   ```bash
   kubectl port-forward svc/argocd-server -n argocd 8080:443
   ```

3. **Acesse o painel do ArgoCD**:
   Abra o navegador e acesse o painel no endereço:
   [https://localhost:8080](https://localhost:8080)

4. **Faça login no ArgoCD**:
   - **Usuário:** `admin`
   - **Senha:** Para obter a senha inicial, use o comando abaixo:
     ```bash
     kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d
     ```

5. **Sincronize as aplicações**:
   Após fazer login, localize as aplicações `ivodocker-dev` e `ivodocker-prod` no painel e clique em **Sync** para sincronizá-las com o cluster Kubernetes.

---

### 🧑‍💻 Autores
* **Paulo Henrique Junio dos Santos Lima**
* **Lucas Pereira de Araujo**
* **Gerson A. da Silva Neto**