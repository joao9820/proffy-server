import {Request, Response} from  'express';
import db from '../database/connection';

export default class ConnectionsController {


    async index(request : Request, response : Response){

        const totalConnections = await db('connections').count('* as total');

        const {total} = totalConnections[0]; //já obtem a posicao total

        return response.json({total}); //dessa forma alem do valor também tem o atributo total


    }

    async create(request : Request, response : Response){

        const {user_id} = request.body;

        await db('connections').insert({user_id});

        return response.status(201).send();

    }



}