# Use uma imagem Node como base
FROM node:18-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Construa a aplicação React
RUN npm run build

# Exponha a porta em que a aplicação será executada
EXPOSE 3030

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "start"]
