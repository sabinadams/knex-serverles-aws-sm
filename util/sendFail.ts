import { APIGatewayProxyResultV2 } from "aws-lambda";

export default (message: string): APIGatewayProxyResultV2 => {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
};
