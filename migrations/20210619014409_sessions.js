
exports.up = function(knex) {
    return knex.schema.createTable('sessions',table => {
        table.increments('id');
        table.integer('user_id').unsigned().notNullable()
        table.string('name').notNullable();
        table.text('token').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sessions');
};
