import knex from 'knex';
import path from'path';

// migrations - controlam a versão do banco de dados, o knex utiliza esse conceito
/* necessário alterar os comandos de exe do knex no arquivo package.json, pois o knex apenas entende 
JS para entender TS nós mesmos configuramos os comandos no atributo script*/

const db = knex({

    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') /* Caminho onde está o arquivo*/
    },
    useNullAsDefault:true,

});

export default db;