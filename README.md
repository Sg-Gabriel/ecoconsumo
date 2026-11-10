# 🌱 EcoConsumo

Aplicação web para acompanhar o consumo mensal de água e energia, visualizar indicadores e incentivar hábitos mais conscientes no uso dos recursos.

O EcoConsumo foi desenvolvido como projeto extensionista relacionado ao **ODS 12 — Consumo e Produção Responsáveis**, com foco em apoiar famílias no acompanhamento do consumo doméstico.

## 🎯 Objetivos

- Facilitar o registro e o acompanhamento do consumo de água e energia.
- Permitir a visualização do histórico e a comparação entre períodos.
- Incentivar práticas de consumo consciente por meio de dicas e desafios.
- Tornar informações de consumo mais acessíveis por meio de uma interface simples e responsiva.

## ✨ Funcionalidades

- **Dashboard:** visão geral dos consumos de água e energia.
- **Registros:** cadastro, consulta e edição dos registros de consumo.
- **Gráficos:** visualização do histórico e comparação dos dados.
- **Filtros por período:** consulta dos dados por ano e intervalo.
- **Dicas de consumo consciente:** orientações para reduzir desperdícios.
- **Desafios:** atividades para incentivar mudanças de hábitos.
- **Conquistas:** acompanhamento de objetivos e progresso.
- **Persistência local:** os dados são armazenados no LocalStorage do navegador.
- **Tema claro e escuro.**
- **Layout responsivo:** adaptação para diferentes tamanhos de tela.

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| React 19 | Construção da interface |
| TypeScript | Tipagem estática |
| Vite 8 | Desenvolvimento e build |
| Tailwind CSS 4 | Estilização |
| React Router DOM 7 | Navegação entre páginas |
| Recharts 3 | Gráficos |
| Docker | Conteinerização |
| Nginx | Servidor dos arquivos estáticos |

## 📂 Arquitetura e armazenamento

O EcoConsumo é uma aplicação frontend estática. Não possui backend, API ou banco de dados remoto.

Os registros e demais informações persistidas pela aplicação são armazenados no **LocalStorage** do navegador. Isso significa que os dados ficam associados ao navegador e ao dispositivo utilizados: não há sincronização automática entre dispositivos ou navegadores diferentes.

Na execução com Docker, o Vite gera os arquivos de produção no estágio de build. A imagem final utiliza Nginx para servir esses arquivos, sem incluir Node.js ou as dependências de desenvolvimento.


## 🚀 Como executar localmente

### Pré-requisitos

Para executar localmente:

- [Node.js](https://nodejs.org/) compatível com o projeto (recomendado Node.js 22 LTS).
- npm.

Para executar com Docker:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) ou Docker Engine.
- Docker Compose v2.


1. Clone o repositório:

   ```bash
   git clone https://github.com/Sg-Gabriel/ecoconsumo.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd ecoconsumo
   ```

3. Instale as dependências:

   ```bash
   npm ci
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

O Vite exibirá no terminal o endereço local para acessar a aplicação, normalmente `http://localhost:5173`.

## 🐋 Como executar com Docker

A conteinerização utiliza um build multi-stage para separar a compilação da aplicação do servidor de produção.

### Construir a imagem

Na raiz do projeto, execute:

```bash
docker compose build
```

### Iniciar o container

```bash
docker compose up -d
```

A aplicação ficará disponível em:

**http://localhost:8080**

### Verificar o estado do container

```bash
docker compose ps
```

O serviço possui um healthcheck para verificar se o Nginx está respondendo.

### Acompanhar os logs

```bash
docker compose logs -f
```

### Verificar o consumo de recursos

```bash
docker stats ecoconsumo
```

### Parar o container

```bash
docker compose down
```

### Reconstruir a imagem após alterações

Quando houver mudanças no código ou nos arquivos de configuração:

```bash
docker compose down
docker compose build
docker compose up -d
```

## 🔐 Otimização e segurança do Docker

A configuração Docker foi preparada para manter a imagem final enxuta e reduzir os privilégios do processo:

- **Build multi-stage:** Node.js e dependências de build ficam apenas no estágio de compilação.
- **Imagem final com Nginx Unprivileged Alpine:** serve os arquivos estáticos sem executar como root.
- **Cache de dependências:** montagem de cache do npm durante o build.
- **`.dockerignore`:** exclui arquivos desnecessários do contexto de construção.
- **Filesystem somente leitura:** o container utiliza `read_only`, com diretórios temporários específicos em `tmpfs`.
- **Redução de privilégios:** capabilities removidas com `cap_drop: ALL` e proteção `no-new-privileges`.
- **Limites de recursos:** configuração de limites de CPU, memória e processos no Docker Compose.
- **Healthcheck:** verifica periodicamente a disponibilidade do servidor.
- **Nginx:** compressão Gzip, cache para assets versionados e fallback para as rotas do React Router.

A configuração do Nginx utiliza a porta 8080 dentro do container, mapeada para a porta 8080 da máquina host.

## 🧪 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica os projetos TypeScript e gera o build de produção |
| `npm run lint` | Executa a análise estática com ESLint |
| `npm run preview` | Serve localmente o build de produção |

## 📂 Estrutura do projeto

A organização principal do código está distribuída entre:

```text
ecoconsumo/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
├── package-lock.json
└── README.md
```

## 🌍 Contexto extensionista

O EcoConsumo foi idealizado como material digital de apoio à comunidade, especialmente pessoas próximas e familiares, para estimular o acompanhamento do consumo doméstico de água e energia e a adoção de práticas mais sustentáveis.

A proposta está alinhada ao **Objetivo de Desenvolvimento Sustentável 12 (ODS 12) — Consumo e Produção Responsáveis**, da Organização das Nações Unidas.

## ⚖️ Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais. Caso queira reutilizar ou distribuir o código, entre em contato.
