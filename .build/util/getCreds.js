"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const secretsManager = new client_secrets_manager_1.SecretsManager({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});
function getCreds() {
    return __awaiter(this, void 0, void 0, function* () {
        const { SecretString } = yield secretsManager.getSecretValue({
            SecretId: "test/Serverless/postgres",
        });
        if (!SecretString)
            throw new Error("SecretString is undefined");
        const { host, port, username, password, database } = JSON.parse(SecretString);
        return {
            host,
            port,
            user: username,
            password,
            database,
        };
    });
}
exports.default = getCreds;
