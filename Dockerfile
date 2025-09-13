# 1(Buildando)
# imagem Node.js para a build
FROM node:18-alpine AS builder

# diretório para trabalhar dentro do container
WORKDIR /usr/src/app

# copia os arquivos de dependência e instala as dependências
COPY package*.json ./
RUN npm install 

# 2: Execução
# Usa uma imagem Node.js minimalista para produção, sem ferramentas de build
FROM node:18-alpine

# diretório de trabalho
WORKDIR /usr/src/app

# Copia as dependências da etapa de build
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copia o restante do código da sua aplicação
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "app.js" ]
