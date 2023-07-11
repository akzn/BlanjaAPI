exports.up = function(knex) {
    return knex.schema.table('address_customer', function(table) {
      table.string('biteship_address_id', 60);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('address_customer', function(table) {
      table.dropColumn('biteship_address_id');
    });
  };
  