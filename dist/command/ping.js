"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const pingCommand = {
    commandOption: {
        commandsAlias: ["ping"],
        minArgs: 0,
        maxArgs: 0,
        callback(message, client, args, argsJoined) {
            const embed = new discord_js_1.default.MessageEmbed()
                .setColor("#77baed")
                .setTitle("Pong! :ping_pong:")
                .setDescription(`:ping_pong: ${client.ws.ping}ms`);
            // message.reply(embed);
            //   message.channel.send("pong! :ping_pong: " + client.ws.ping + "ms");
            message.reply({ embeds: [embed] });
        },
    },
};
module.exports = pingCommand;
// module.exports = pingCommand;
