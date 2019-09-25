
exports.up = function(knex) {
  return knex.schema.createTable('strata_corporations', (t) => {
    t
      .bigIncrements('id')
      .unsigned()
      .primary();
    t
      .string('name')
      .notNullable();
    t
      .string('strata_plan_number')
      .unique()
      .notNullable();
    t.string('title_to_land');  
    t.string('status');
    t.timestamp('createdAt').default(knex.fn.now());
    t.timestamp('updatedAt').default(knex.fn.now());
  }).createTable('strata_sections', (t) => {
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
    t.string('name'); 
    t.string('type').default('corporation');  
    t.string('status').default('active');
    t.string('use_type').default('residential')
    t.timestamp('createdAt').default(knex.fn.now());
    t.timestamp('updatedAt').default(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('strata_sections')
    .dropTable('strata_corporations')
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
//       .unique()
//       .notNullable();
//     t.string('title_to_land');  
//     t.string('status');
//     t.timestamp('createdAt').default(knex.fn.now());
//     t.timestamp('updatedAt').default(knex.fn.now());
//   })
  
// };

      // t
      // .bigInteger('strata_corporation_id')
      // .unsigned()
      // .notNullable()
      // .references('id')
      // .inTable('strata_corporations')
      // .onDelete('CASCADE')
      // .index();

      // table.foreign('company_id')
      // .references('companies.id')

      
      // table
        // .biginteger('otherTableId')
        // .unsigned()
        // .notNullable()
        // .references('id')
        // .inTable('OtherTable')
        // .onDelete('CASCADE')
        // .index();
      // table.integer('book_id').references('books.id')
      // knex.schema.table('users', function (table) {
      //   table.integer('user_id').unsigned()
      //   table.foreign('user_id').references('Items.user_id_in_items')
      // })



      // t
    //   .string('name')
    //   .notNullable();
    // t
    //   .string('strata_plan_number')
    //   .unique()
    //   .notNullable();
    // t.string('title_to_land');  

// exports.up = function(knex) {
//   return knex.schema.createTable('books', function(table) {
//     table.increments('id').primary()
//     table.string('name')
//   }).createTable('pages', function(table) {
//     table.increments('id').primary()
//     table.string('content')
//     table.integer('book_id').references('books.id')
//   })
// };

// exports.down = function(knex) {
//   return knex.schema.dropTable('books')
//     .dropTable('pages')
// }
