/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('cliente', table => {
        table.increments('id')
        table.string('nome', 255).notNullable()
        table.string('telefone', 11).notNullable()
        table.string('endereco', 300).notNullable()
        table.string('idade', 3).notNullable()
      })
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('cliente')
};
