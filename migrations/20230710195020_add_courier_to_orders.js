exports.up = function (knex) {
    return knex.schema.alterTable('orders', function (table) {
      table.integer('id_store_address').unsigned().nullable();
      table.string('courier_code').nullable();
      table.string('courier_type').nullable();
      table.decimal('courier_price', 10, 2).nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('orders', function (table) {
      table.dropColumn('id_store_address');
      table.dropColumn('courier_code');
      table.dropColumn('courier_type');
      table.dropColumn('courier_price');
    });
  };
  