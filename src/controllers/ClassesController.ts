import {Request, Response} from 'express' 

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

//Forrmato do objeto
interface ScheduleItem{
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {

    async index(request: Request, response: Response){
        const filters = request.query;

        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: "Missing filters to search classes"
            });
        }


        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
        .where('classes.subject', '=', subject)
        .where('class_schedule.week_day', '=' , week_day)
        .where('class_schedule.from', '<=', timeInMinutes)
        .where('class_schedule.to', '>', timeInMinutes)
        .join('users', 'classes.user_id', '=', 'users.id')
        .join('class_schedule', 'classes.id', '=' ,'class_schedule.class_id')
        .select('users.*', 'classes.*');

        return response.json(classes);

    }

    async create (request: Request, response: Response) {

        /* Método para desestruturação das informações, enviadas,
        dessa forma cada valor de atributo irá para a sua respectiva variaável 
        . Não é preciso trazer todas as variáveis*/
        const { 
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        
        //Ao invés de usar db agora usamos transaction
        const transaction = await db.transaction();
    
        try {
    
            //Aguarda a informação ser registrada no db para continuar a execução do código
            //Sintaxe short syntax, se o nome do objeto é igual valor, pode escrevê-lo apenas uma vez
            //É possível inserir vários users passando um array de objetos, por isso o retorno dos ids inseridos é um array
            const insertedUsersIds = await transaction('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
    
            const user_id = insertedUsersIds[0];
    
        const insertedClassesIds = await transaction('classes').insert({
                subject,
                cost,
                user_id
            });
    
        const class_id = insertedClassesIds[0];
    
            //A maioria dos BDs não possuem o tipo hour apenas, geralmente só datetime, date
            //Converteremos para minutos o horário
    
            //Poderia ser do tipo any, porém para aproveitar o autoComplete declaremos na interface o que conterá
            const classSchedule = schedule.map((scheduleItem:ScheduleItem) => {
    
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
    
                };
    
            }); //Percorre o array e transforma em um novo objeto
    
            //Os objetos já estão no formato que a tabela espera
                
                await transaction('class_schedule').insert(classSchedule);
            
                //Apenas aqui os dados são persistidos no bd
                await transaction.commit();
    
            //console.log(schedule);
    
            return response.status(201).send();
            
        } catch (error) {
            
            await transaction.rollback();
    
            return response.status(400).json({error: 'Unexpected error while creating new class'})
        }
    
    }

}