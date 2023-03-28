import { SecretsManager } from "@aws-sdk/client-secrets-manager";

const secretsManager = new SecretsManager({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export default async function getCreds() {
  const { SecretString } = await secretsManager.getSecretValue({
    SecretId: "test/Serverless/postgres",
  });

  if (!SecretString) throw new Error("SecretString is undefined");

  const { host, port, username, password, database } = JSON.parse(SecretString);

  return {
    host,
    port,
    user: username,
    password,
    database,
  };
}
