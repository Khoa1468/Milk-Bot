"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
module.exports = async function () {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    return mongoose_1.default;
};
