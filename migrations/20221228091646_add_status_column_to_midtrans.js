/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('midtrans', table => {
        table.string('transaction_id',255)
        table.string('transaction_status', 128);
        table.string('payment_type', 255);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('midtrans', table => {
        table.dropColumn('transaction_id');
        table.dropColumn('transaction_status');
        table.dropColumn('payment_type');
      })
};
