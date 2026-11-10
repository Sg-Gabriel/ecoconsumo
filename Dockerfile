
# syntax=docker/dockerfile:1.7

# ==========================================
# Estágio 1: Build da aplicação
# ==========================================
FROM node:22-alpine AS build

WORKDIR /app

# Copia primeiro os arquivos de dependências.
# Isso permite aproveitar o cache do Docker.
COPY package.json package-lock.json ./

# Instala as dependências usando cache do npm.
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copia o código-fonte.
COPY . .

# Gera a versão de produção.
RUN npm run build


# ==========================================
# Estágio 2: Servidor de produção
# ==========================================
FROM nginxinc/nginx-unprivileged:alpine AS production

# Remove a configuração padrão.
RUN rm /etc/nginx/conf.d/default.conf

# Adiciona nossa configuração personalizada.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia somente os arquivos compilados.
COPY --from=build /app/dist /usr/share/nginx/html

# O Nginx Unprivileged utiliza a porta 8080.
EXPOSE 8080

# Inicia o servidor em primeiro plano.
CMD ["nginx", "-g", "daemon off;"]
