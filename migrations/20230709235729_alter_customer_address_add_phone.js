exports.up = function(knex) {
    return knex.schema.table('address_customer', function(table) {
      table.string('phone', 20).nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('address_customer', function(table) {
      table.dropColumn('phone');
    });
  };
  