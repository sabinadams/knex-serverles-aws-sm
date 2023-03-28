import type { Knex } from "knex";
import getCreds from "./util/getCreds";
require("dotenv").config();

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: async () => {
      return await getCreds();
    },
    migrations: {
      directory: "./knex/migrations",
      extension: "ts",
    },
  },
};

module.exports = config;
