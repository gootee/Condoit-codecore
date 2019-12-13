
exports.up = function(knex) {
  return knex.schema.table('engine_tasks', function (table) {
    table.string('ref_id_type');
  })  
};

exports.down = function(knex) {
  
};
