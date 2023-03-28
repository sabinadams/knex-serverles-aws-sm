import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("User", (table) => {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("name");
    })
    .createTable("Post", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.string("content");
      table.boolean("published").defaultTo(false);
      table.integer("authorId").references("id").inTable("User");
    })
    .createTable("Profile", (table) => {
      table.increments("id").primary();
      table.string("bio");
      table.integer("userId").references("id").inTable("User");
    });
}

export async function down(knex: Knex): Promise<void> {}
