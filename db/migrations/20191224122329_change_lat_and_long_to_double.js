
exports.up = function(knex) {
    return knex.schema.table('addresses', function (table) {
      table.dropColumn('latitude');
      table.dropColumn('longitude');
    })
};

exports.down = function(knex) {
  
};
