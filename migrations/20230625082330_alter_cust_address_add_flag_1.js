exports.up = function(knex) {
    return knex.schema.alterTable('address_customer', function(table) {
      table.enum('is_primary', [0, 1]).defaultTo(0);
      table.enum('is_active', [0, 1]).defaultTo(1);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('address_customer', function(table) {
      table.dropColumn('is_primary');
      table.dropColumn('is_active');
    });
  };
