
exports.up = function(knex) {
  return knex.schema.table('strata_images', function (table) {
    table.dropColumn('image_url');
    table.text('image_url');
  })
};

exports.down = function(knex) {
  
};
