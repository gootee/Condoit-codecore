
exports.up = function(knex) {
    return knex.schema.createTable('engine_tasks', (t) => {
    t
      .bigIncrements('id')
      .unsigned()
      .primary();
    t
      .string('type')
      .notNullable();
    t
      .string('subtype')
      .notNullable();
    t
      .bigInteger('ref_id')
      .unsigned();
    t
      .string('url')
      .notNullable();
    t.string('status');
    t.timestamp('createdAt').default(knex.fn.now());
    t.timestamp('updatedAt').default(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('engine_tasks')
};

