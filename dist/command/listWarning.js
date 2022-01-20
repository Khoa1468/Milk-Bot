"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const warnSchemas_1 = __importDefault(require("../schemas/warnSchemas"));
const mongo_1 = __importDefault(require("../mongo"));
const discord_js_1 = __importDefault(require("discord.js"));
const listWarningCommand = {
    commandOption: {
        commandsAlias: ["listWarning", "lw"],
        async callback({ message, args }) {
            const permissionError = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Permission Error")
                .setDescription("You don't have the permission to use this command.");
            if (!message.member?.permissions.has("ADMINISTRATOR"))
                return message.reply({ embeds: [permissionError] });
            const target = message.mentions.members.first();
            const cannotFindMember = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Cannot find member")
                .setDescription("Please mention a valid member of this server");
            if (!target)
                return message.reply({ embeds: [cannotFindMember] });
            const guildID = message.guildId;
            const userID = message.member.id;
            const mongoose = await (0, mongo_1.default)();
            try {
                const result = await warnSchemas_1.default.findOne({ guildID, userID });
                let reply = `Previous warnings for <@${userID}>\n\n`;
                for (const warning of result.warnings) {
                    if (warning.target === target.user.tag) {
                        reply += `${warning.target} was warned by ${warning.author} for ${warning.reason} on ${new Date(warning.timestamp).toString()}\n\n`;
                    }
                }
                message.channel.send(reply);
            }
            finally {
                mongoose.connection.close();
            }
        },
    },
};
module.exports = listWarningCommand;
