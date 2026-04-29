SayIt 🐦

SayIt é uma plataforma de microblogging simplificada, inspirada no Twitter, desenvolvida para colocar em prática conceitos avançados de desenvolvimento Full Stack. O projeto foca na criação de uma interface interativa conectada a um backend robusto e escalável.

⚠️ Status do Projeto: 🛠️ Em desenvolvimento ativo.

🚀 Tecnologias Utilizadas
Este projeto utiliza o que há de mais moderno no ecossistema JavaScript:


Frontend: React.js com Tailwind CSS para uma interface responsiva e moderna.


Backend: Node.js para a construção de uma API eficiente.


Banco de Dados: PostgreSQL para persistência de dados estruturados.


Infraestrutura: Docker para a conteinerização do ambiente, garantindo que o sistema rode de forma idêntica em qualquer máquina.

🛠️ Funcionalidades (Em implementação)
[x] Estrutura base do Frontend e Backend.

[x] Configuração do ambiente com Docker.

[x] Sistema de autenticação de usuários (Login/Cadastro).

[ ] Criação e exibição de feeds de mensagens (SayIts).

[ ] Perfis de usuário personalizáveis.

🏗️ Como Rodar o Projeto
Como o projeto utiliza Docker, você não precisa se preocupar com dependências locais:

Clone o repositório:

Bash
git clone https://github.com/Icaro-K/sayIt--twitterClone.git
Acesse a pasta do projeto:

Bash
cd sayIt--twitterClone
Suba os containers:

Bash
docker-compose up --build
O sistema estará disponível em http://localhost:3000.