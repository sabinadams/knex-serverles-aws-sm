"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (message) => {
    return {
        statusCode: 400,
        body: JSON.stringify({ message }),
    };
};
