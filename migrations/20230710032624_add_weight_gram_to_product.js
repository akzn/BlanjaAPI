exports.up = function(knex) {
    return knex.schema.alterTable('products', function(table) {
      table.decimal('weight_gram');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('products', function(table) {
      table.dropColumn('weight_gram');
    });
  };
  