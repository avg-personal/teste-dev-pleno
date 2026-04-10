1. Requisitos de Sistema
Runtime: Node.js (versão 18.0.0 ou superior).

Gerenciador de pacotes: npm (nativo do Node.js).

2. Configuração do Backend e Persistência
O servidor processa as requisições e gerencia o banco de dados SQLite através do Prisma ORM.

Acesse o diretório do servidor:

cd backend

Instale as dependências listadas no arquivo package.json:

npm install

Execute as migrações para criar o esquema do banco de dados local:

npx prisma migrate dev --name init

Inicie o serviço em modo de desenvolvimento:

npm run dev

3. Configuração do Frontend
A interface foi construída sobre o framework React utilizando o ecossistema Vite.

Acesse o diretório da interface em um novo terminal:

cd frontend

Instale as dependências necessárias para a build e execução:

npm install

Inicie o servidor de desenvolvimento:

npm run dev

4. Parâmetros de Conectividade e Portas
Para o correto funcionamento da integração entre as camadas, certifique-se de que as portas padrão não estejam ocupadas por outros processos:

API (Backend): Ocupa a porta 3000.

Web (Frontend): Ocupa a porta 5173.

Integração: O frontend utiliza o endereço http://localhost:3000 como base para todas as chamadas de API via Axios.