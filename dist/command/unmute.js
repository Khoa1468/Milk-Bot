"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const unmuteCommand = {
    commandOption: {
        commandsAlias: ["unmute"],
        minArgs: 1,
        maxArgs: 1,
        async callback(message, client, args, text) {
            if (!message.member?.permissions.has("ADMINISTRATOR")) {
                await message.reply({
                    embeds: [
                        new discord_js_1.default.MessageEmbed()
                            .setColor("#ff1100")
                            .setTitle(":x: Permission Error")
                            .setDescription("You don't have the permission to use this command."),
                    ],
                });
                return;
            }
            const member = message.mentions.members?.first();
            if (member) {
                const successEmbed = new discord_js_1.default.MessageEmbed()
                    .setColor("#00ff80")
                    .setTitle(":white_check_mark: Success!")
                    .setDescription("User have been unmuted");
                let mainRole = message.guild?.roles.cache.find((role) => role.name === "Nhân Dân");
                let muteRole = message.guild?.roles.cache.find((role) => role.name === "Tù Nhân");
                const target = message.guild?.members.cache.get(member.id);
                target?.roles.remove(muteRole);
                target?.roles.add(mainRole);
                message.reply({ embeds: [successEmbed] });
            }
            else {
                const failedEmbed = new discord_js_1.default.MessageEmbed()
                    .setColor("#ff1100")
                    .setTitle(":x: Failed!")
                    .setDescription("User not found");
                await message.reply({ embeds: [failedEmbed] });
                return;
            }
        },
    },
};
module.exports = unmuteCommand;
