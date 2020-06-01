# Back-End_to_irriga2
# Instalação
1 - Após baixar os arquivos abra o CMD e vá até a pasta onde os arquivos estão localizados.
2 - Inicie a configuraçao do servidor com o comando: npm init
3 - Insira as informações, mas não são obrigatórias, apenas certifique-se que o arquivo de inicio seja o arquivo server.js
4 - Instale as dependências necessárias com o comando npm i ou npm install:
    - express
    - axios
    - node-cron
    - readline
    - mysql
    - standard
    
5 - Preparar o banco de dados, criando um banco de dados local com a tabela cities e cities_wheater (arquivos em anexo)
6 - Abrir o arquivo BD.js e inserir as credenciais do seu banco de dados criado.
7 - abrir o arquivo server.js e inserir a chave de acesso a API.
8 - Voltar ao CMD e iniciar o servidor com o comando: node server.js

# Comandos internos
1 - A rotina principal é executada a cada hora no minuto 30, mas é possivel executa-la manualmente.
2 - Para executar a rotina com todas as cidades do banco, no CMD com o servidor rodando digite: buscar
3 - Para executar a rotina em apenas uma cidade, no CMD com o servidor rodando digite: buscar ID ou buscar nome
    - o ID é o id da cidade. Ele deve ser o identico ao ID que identifica a cidade na tabela CITIES em seu BD
    