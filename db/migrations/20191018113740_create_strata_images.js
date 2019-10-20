
exports.up = function(knex) {
  return knex.schema.createTable('strata_images', (t) => {
    t
      .bigIncrements('id')
      .unsigned()
      .primary();
    t
      .bigInteger('strata_corporation_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('strata_corporations')
      .onDelete('CASCADE')
      .index();
    t.string('image_url'); 
    t.integer('order').default(-1);
    t.boolean('is_cover').default(false);  
    t.string('status').default('active');
    t.timestamp('createdAt').default(knex.fn.now());
    t.timestamp('updatedAt').default(knex.fn.now());
  })
};

exports.down = function(knex) {
  
};
