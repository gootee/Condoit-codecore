
exports.up = function(knex) {
  return knex.schema.table('addresses', function (table) {
    table.specificType('latitude', 'double precision');
    table.specificType('longitude', 'double precision');
  })
};

exports.down = function(knex) {
  
};
