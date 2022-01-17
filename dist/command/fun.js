"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const funCommand = {
    commandOption: {
        commandsAlias: ["fun", "f"],
        minArgs: 0,
        maxArgs: 0,
        async callback({ message }) {
            try {
                const funEmbed = new discord_js_1.default.MessageEmbed()
                    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                    .setTitle("Fun")
                    .setDescription("Click Embed To Fun");
                await message.reply({ embeds: [funEmbed] });
            }
            catch (error) {
                message.reply("Error: " + error.message);
            }
        },
    },
};
module.exports = funCommand;
