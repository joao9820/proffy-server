import Knex from 'knex';

//Assim como no laravel, para realizar alteração ou desfazer
export async function up(knex: Knex){

    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

          //Relacionamento
          table.integer('user_id').notNullable()
          .references('id').inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');

          table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
          .notNullable();
    });

}

export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}