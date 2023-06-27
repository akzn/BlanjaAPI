exports.up = function (knex) {
    return knex.schema.alterTable('orders', function (table) {
      table.specificType('status_order', "ENUM('Pending','On Process', 'Delivery', 'Delivered', 'Canceled')")
        .defaultTo('Pending')
        .notNullable()
        .alter();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('orders', function (table) {
      table.specificType('status_order', "ENUM('On Process', 'Delivery', 'Delivered')")
        .defaultTo('On Process')
        .notNullable()
        .alter();
    });
  };
  