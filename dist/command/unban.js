"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const unbanCommand = {
    commandOption: {
        commandsAlias: ["unban"],
        minArgs: 1,
        maxArgs: 1,
        async callback(message, client, args, text) {
            if (!message.member.permissions.has("BAN_MEMBERS")) {
                await message.reply({
                    embeds: [
                        new discord_js_1.default.MessageEmbed()
                            .setColor("#ff1100")
                            .setTitle(":x: Permission Error")
                            .setDescription("You don't have the permission to use this command."),
                    ],
                });
                setTimeout(async () => {
                    if (message.channel.type !== "DM") {
                        await message.channel.bulkDelete(2);
                    }
                }, 2000);
                return;
            }
            try {
                const memberUnban = await message.guild.members.unban(args[0]);
                await message.reply("Unbanned " + memberUnban.tag);
            }
            catch (error) {
                await message.reply(`User ${args[1]} is not unbanned`);
            }
        },
    },
};
module.exports = unbanCommand;
