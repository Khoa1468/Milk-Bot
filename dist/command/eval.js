"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const ownerID = "597592685129498644";
const channelID = "924950898839531540";
const evalCommand = {
    commandOption: {
        commandsAlias: ["eval", "e"],
        async callback({ message, client, args, text }) {
            const result = eval(text);
            const successEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#00ff00")
                .setTitle("Success")
                .addFields({ name: "Input", value: `\`\`\`js\n${text}\`\`\`` }, { name: "Output", value: `\`\`\`js\n${result}\`\`\`` }, { name: "Type", value: `\`\`\`js\n${typeof result}\`\`\`` });
            if (message.author.id === ownerID && message.channelId === channelID) {
                await message.channel.send({ embeds: [successEmbed] });
            }
        },
    },
};
module.exports = evalCommand;
