
exports.up = function(knex) {
  return knex.schema.createTable('province_states', (t) => {
    t
      .string('code')
      .unique()
      .primary();
    t
      .string('name')  
    t.timestamp('createdAt').default(knex.fn.now());
    t.timestamp('updatedAt').default(knex.fn.now());           
  }).createTable('cities', (t) => {
    t
      .bigIncrements('id')
      .unsigned()
      .primary();
    t
      .string('name')  
    t
      .string('province_state_code')
      .default('BC')
      .notNullable()
      .references('code')
      .inTable('province_states')
      .onDelete('NO ACTION')
      .index(); 
    t.timestamp('createdAt').default(knex.fn.now());
    t.timestamp('updatedAt').default(knex.fn.now());           
  }).createTable('addresses', (t) => {
    t
      .bigIncrements('id')
      .unsigned()
      .primary();
    t
      .string('suite_number')
    t
      .string('street_number')
    t
      .string('street_name')
    t
      .string('postal_code')
    t
      .string('cross_street_name')
    t
      .float('latitude')
    t
      .float('longitude')
    t
      .bigInteger('city_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cities')
      .onDelete('NO ACTION')
      .index();
    t.timestamp('createdAt').default(knex.fn.now());
    t.timestamp('updatedAt').default(knex.fn.now());
  }).createTable('address_refs', (t) => {
    t
      .bigIncrements('id')
      .unsigned()
      .primary();
    t
      .bigInteger('reference_id')
      .unsigned()
      .notNullable()
    t
      .string('reference_id_type')
      .notNullable()
      .default('strata_corporation')
    t
      .string('reference_type')
      .notNullable()
      .default('occupy')  
    t
      .string('status')
      .notNullable()
      .default('active')    
    t
      .bigInteger('address_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('addresses')
      .onDelete('CASCADE')
      .index();
    t
      .timestamp('createdAt').default(knex.fn.now());
    t
      .timestamp('updatedAt').default(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('address_refs')
    .dropTable('addresses')
    .dropTable('cities')
    .dropTable('province_states')
};



// exports.up = function(knex) {
//   return knex.schema.createTable('strata_corporations', (t) => {
//     t
//       .bigIncrements('id')
//       .unsigned()
//       .primary();
//     t
//       .string('name')
//       .notNullable();
//     t
//       .string('strata_plan_number')
//       .notNullable();
//     t.string('title_to_land');  
//     t.string('status');
//     t.timestamp('createdAt').default(knex.fn.now());
//     t.timestamp('updatedAt').default(knex.fn.now());
//   }).createTable('strata_sections', (t) => {
//     t
//       .bigIncrements('id')
//       .unsigned()
//       .primary();
//     t
//       .bigInteger('strata_corporation_id')
//       .unsigned()
//       .notNullable()
//       .references('id')
//       .inTable('strata_corporations')
//       .onDelete('CASCADE')
//       .index();
//     t.string('name'); 
//     t.string('type').default('corporation');  
//     t.string('status').default('active');
//     t.string('use_type').default('residential')
//     t.timestamp('createdAt').default(knex.fn.now());
//     t.timestamp('updatedAt').default(knex.fn.now());
//   })
// };

// exports.down = function(knex) {
//   return knex.schema.dropTable('strata_sections')
//     .dropTable('strata_corporations')
// };
