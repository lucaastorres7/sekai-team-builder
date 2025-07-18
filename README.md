# 🎮 Project Sekai: Team Builder
## 📖 Sobre o Projeto
Esta é a API de backend para uma aplicação de fãs do jogo *Project SEKAI: Colorful Stage!*. O projeto foi construído com o objetivo de criar uma fundação robusta, segura e escalável para um cliente frontend, permitindo que os usuários criem e gerenciem seus times de cartas. A API foi desenvolvida com foco em boas práticas de arquitetura de software, segurança e uma ótima experiência para o desenvolvedor.

## ✨ Funcionalidades
-   [x] **Autenticação de Usuários**: Sistema completo de cadastro e login utilizando JWT para proteger as rotas.
-   [x] **Gerenciamento de Times**: Operações CRUD completas para que usuários autenticados possam criar, visualizar, atualizar e deletar seus times.
-   [x] **Validação de Regras de Negócio**: Lógica no servidor que impede a criação de times com cartas duplicadas ou com múltiplos personagens repetidos.
-   [x] **Gerenciamento de Dados**: Endpoints para visualizar as cartas e personagens do jogo.
-   [x] **Controle de Acesso por Papel (Role-Based)**: Implementação de um `AdminGuard` para proteger rotas que só podem ser acessadas por administradores (ex: cadastro de novas cartas).
-   [x] **Integridade de Dados**: Uso de deleções em cascata no banco de dados para garantir que, ao deletar um usuário, todos os seus dados relacionados (como times) sejam removidos de forma consistente.

## 🛠️ Tecnologias Utilizadas
- **NestJS**: Um framework Node.js para construir aplicações de servidor eficientes, escaláveis e robustas, utilizando TypeScript.
- **Prisma**: ORM de próxima geração que garante a segurança de tipos de ponta a ponta, desde o banco de dados até a sua aplicação.
- **PostgreSQL**: Um banco de dados relacional de código aberto, conhecido por sua confiabilidade e performance.
- **TypeScript**: Superset do JavaScript que adiciona tipagem, aumentando a robustez e a manutenibilidade do código.

## 🚀 Como Executar o Projeto
1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/lucaastorres7/sekai-team-builder.git
    cd sekai-team-builder
    ```
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente**:
   ```bash
   # Copie o `.env.example` para o `.env` e preencha o DATABASE_URL
   # com as variaveis POSTGRES_USER, POSTGRES_PASSWORD e POSTGRES_DB
   cp .env.example .env
   ```
4. **Aplique as migrações do banco de dados**:
   ```bash
   npx prisma migrate dev
   ```
6. **Execute o servidor de desenvolvimento**:
   ```bash
   npm run start:dev
   ```
A aplicação estará rodando em `http://localhost:3333` e você já pode testar as rotas.


## 👤 Autor
| <img src="https://avatars.githubusercontent.com/u/151575079?s=400&u=96fac0907f9100c143dc9f46242cacdf17af240f&v=4" alt="Lucas Torres" width="150" height="150"> |
| --------------------------------------------------------------------------------------------------------------- |
| [Lucas Torres](https://github.com/lucaastorres7)                                                                |
