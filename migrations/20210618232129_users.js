
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('name', 150);
        table.string('email',150);
        table.string('password')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
