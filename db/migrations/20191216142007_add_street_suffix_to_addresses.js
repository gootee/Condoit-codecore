
exports.up = function(knex) {
  return knex.schema.table('addresses', function (table) {
    table.string('street_suffix');
  })  
};

exports.down = function(knex) {
  
};
