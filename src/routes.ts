import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
//const util = require('util');

const routes = express.Router(); /* Apenas criamos uma variável a mais para não utilizar diretamente no app as rotas */

routes.get('/', (request, response) => {
    
    return response.json({"message": "Hello World"});

});

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

//Função sem o nome funcition = arrow function
// /users é chamado de recurso
/* Navegador por padrão sempre utiliza o método GET */

// Query Builder: Knex - comando = npm install knex sqlite

// :params na rotas ex:users/:id
routes.post('/users', (request, response) => {

    const users = [
        {name: "João Victor", age: 21},
        {name: "Gabriela", age: 22},
        {name: "Dhemes", age: 24},

    ];

    // request.query ? parametros get da rota
    // console.log(util.inspect(request.body, {depth: null}));

    console.log(request.body);
    console.log("Acessou a rota");

    return response.send(users);


});


export default routes;