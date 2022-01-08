
exports.up = function(knex) {
  return knex.schema.createTable('table_name', (table) => {
    table.increments();
    table.string('field');
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('table_name');
};
