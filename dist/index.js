"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const command_1 = __importDefault(require("./command"));
(0, dotenv_1.config)();
const TOKEN = process.env.BOT_TOKEN;
const client = new discord_js_1.default.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_BANS"],
});
const PREFIX = process.env.BOT_PREFIX;
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const baseFile = "index.js";
    function readCommand(dir) {
        const files = fs
            .readdirSync(path_1.default.join(__dirname, dir))
            .filter((file) => file.endsWith(".js"));
        for (const file of files) {
            const stat = fs.lstatSync(path_1.default.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommand(path_1.default.join(dir, file));
            }
            else if (file !== baseFile) {
                const option = require(path_1.default.join(__dirname, dir, file));
                (0, command_1.default)(client, option);
                // console.log(file);
            }
        }
    }
    readCommand("command");
});
client.login(TOKEN);
