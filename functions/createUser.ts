import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import knex from "../util/db";
import { z } from "zod";
import sendFail from "../util/sendFail";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) {
    return sendFail("No body provided.");
  }

  let data: z.infer<typeof createUserSchema>;
  try {
    data = createUserSchema.parse(JSON.parse(event.body));
  } catch (e: any) {
    return sendFail("Invalid body provided.");
  }

  const [user] = await knex("User")
    .insert({
      email: data.email,
      name: data.name,
    })
    .select("id");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.id,
      message: "User created.",
    }),
  };
};
