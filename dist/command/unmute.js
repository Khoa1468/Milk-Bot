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
        async callback({ message }) {
            const failedEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Failed!")
                .setDescription("User not found");
            const permissionErrorEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Permission Error")
                .setDescription("You don't have the permission to use this command.");
            const successEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#00ff80")
                .setTitle(":white_check_mark: Success!")
                .setDescription("User have been unmuted");
            const userIsNotMuted = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Failed!")
                .setDescription("User is not muted");
            const DMUnmutedSuccessEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#77baed")
                .setTitle("You have been unmuted!")
                .setDescription("You have been unmuted!");
            if (!message.member?.permissions.has("ADMINISTRATOR")) {
                await message.reply({
                    embeds: [permissionErrorEmbed],
                });
                return;
            }
            const member = message.mentions.members?.first();
            if (member) {
                let mainRole = message.guild?.roles.cache.find((role) => role.name === "Nhân Dân");
                let muteRole = message.guild?.roles.cache.find((role) => role.name === "Tù Nhân");
                const target = message.guild?.members.cache.get(member.id);
                if (!target?.roles.cache.has(muteRole.id) &&
                    target?.roles.cache.has(mainRole.id)) {
                    return message.reply({ embeds: [userIsNotMuted] });
                }
                target?.roles.remove(muteRole);
                target?.roles.add(mainRole);
                message.reply({ embeds: [successEmbed] });
                await member.send({ embeds: [DMUnmutedSuccessEmbed] });
            }
            else {
                await message.reply({ embeds: [failedEmbed] });
                return;
            }
        },
    },
};
module.exports = unmuteCommand;
