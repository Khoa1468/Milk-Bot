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
            const memberTarget = client.users.cache.find((user) => user.tag === args[0] || user.id === args[0]);
            const permissionErrorEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Permission Error")
                .setDescription("You don't have the permission to use this command.");
            const successUnbanEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#00ff80")
                .setTitle(":white_check_mark: Success!")
                .setDescription(`${memberTarget} have been unbanned`);
            const DMSuccessUnbanEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#77baed")
                .setTitle(`You have been unbanned from ${message.guild.name}`)
                .setDescription(`You have been unbanned from ${message.guild.name} by ${message.author} ${message.guild}`);
            const userNotFoundEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Failed!")
                .setDescription("User not found");
            const cannotUnbanEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Failed!")
                .setDescription("You cannot unban this user");
            if (!message.member.permissions.has("BAN_MEMBERS")) {
                await message.reply({
                    embeds: [permissionErrorEmbed],
                });
                return;
            }
            try {
                if (memberTarget) {
                    const memberUnban = await message.guild.members.unban(memberTarget);
                    await message.reply({ embeds: [successUnbanEmbed] });
                    await memberTarget.send({ embeds: [DMSuccessUnbanEmbed] });
                }
                else {
                    return message.reply({ embeds: [userNotFoundEmbed] });
                }
            }
            catch (error) {
                await message.reply({ embeds: [cannotUnbanEmbed] });
            }
        },
    },
};
module.exports = unbanCommand;
