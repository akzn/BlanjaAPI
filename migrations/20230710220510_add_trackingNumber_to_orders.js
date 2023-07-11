exports.up = function (knex) {
    return knex.schema.alterTable('orders', function (table) {
      table.string('shipping_status').nullable();
      table.string('courier_tracking_number').nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('orders', function (table) {
      table.dropColumn('shipping_status');
      table.dropColumn('courier_tracking_number');
    });
  };