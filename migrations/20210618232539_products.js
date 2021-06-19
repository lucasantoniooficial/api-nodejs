
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id');
        table.string('name');
        table.string('brand');
        table.double('price',2);
        table.enum('status',['active','inactive']).default('active');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
