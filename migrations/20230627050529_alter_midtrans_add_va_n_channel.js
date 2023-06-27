exports.up = function(knex) {
    return knex.schema.table('midtrans', function(table) {
      table.string('channel_name', 25).after('payment_type');
      table.string('va_number', 255).after('channel_name');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('midtrans', function(table) {
      table.dropColumn('va_number');
      table.dropColumn('channel_name');
    });
  };
