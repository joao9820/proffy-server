import Knex from 'knex';

//Assim como no laravel, para realizar alteração ou desfazer
export async function up(knex: Knex){

    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //Relacionamento
        table.integer('user_id').notNullable()
        .references('id').inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });

}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}