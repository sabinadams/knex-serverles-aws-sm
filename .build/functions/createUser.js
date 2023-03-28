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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const db_1 = __importDefault(require("../util/db"));
const zod_1 = require("zod");
const sendFail_1 = __importDefault(require("../util/sendFail"));
const createUserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
});
const handler = (event, _context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event.body) {
        return (0, sendFail_1.default)("No body provided.");
    }
    let data;
    try {
        data = createUserSchema.parse(JSON.parse(event.body));
    }
    catch (e) {
        return (0, sendFail_1.default)("Invalid body provided.");
    }
    const [user] = yield (0, db_1.default)("User")
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
});
exports.handler = handler;
