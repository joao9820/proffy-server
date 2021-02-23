import Knex from 'knex';

//Assim como no laravel, para realizar alteração ou desfazer
export async function up(knex: Knex){

    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        //Relacionamento
        table.integer('class_id').notNullable()
        .references('id').inTable('classes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });

}

export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');
}