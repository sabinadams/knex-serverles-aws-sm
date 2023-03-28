import Knex from "knex";
import getCreds from "./getCreds";

const knex = Knex({
  client: "pg",
  connection: async () => {
    return await getCreds();
  },
});

export default knex;
