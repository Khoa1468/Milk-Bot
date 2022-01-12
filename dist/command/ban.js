"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const ms_1 = __importDefault(require("ms"));
const banCommand = {
    commandOption: {
        commandsAlias: ["ban", "b"],
        minArgs: 1,
        maxArgs: 1,
        async callback(message, client, args, text) {
            const member = message.mentions.members?.first();
            if (!member)
                return message.reply("Please mention a valid member of this server");
            const reasonText = args.filter((args, index) => index > 1).join(" ");
            const permissionError = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Permission Error")
                .setDescription("You don't have the permission to use this command.");
            const DMSuccessBanned = new discord_js_1.default.MessageEmbed()
                .setColor("#77baed")
                .setTitle(`You have been banned from ${message.guild.name}`)
                .setDescription(`You have been banned from ${message.guild.name} by ${message.author} ${message.guild}`)
                .addFields([
                { name: "Reason", value: reasonText || "No Reason Given" },
            ]);
            const DMSuccessBannedTime = new discord_js_1.default.MessageEmbed()
                .setColor("#77baed")
                .setTitle(`You have been banned from ${message.guild.name}`)
                .setDescription(`You have been banned from ${message.guild.name} by ${message.author} ${message.guild}`)
                .addFields([
                { name: "Reason", value: reasonText || "No Reason Given" },
                { name: "Time", value: args[1] || "No Time Given" },
            ]);
            const successEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#00ff80")
                .setTitle(":white_check_mark: Success!")
                .setDescription(`${member.user} have been banned`)
                .addFields([
                { name: "Reason", value: reasonText || "No Reason Given" },
            ]);
            const successEmbedTime = new discord_js_1.default.MessageEmbed()
                .setColor("#00ff80")
                .setTitle(":white_check_mark: Success!")
                .setDescription(`${member.user} have been banned`)
                .addFields([
                { name: "Reason", value: reasonText || "No Reason Given" },
                { name: "Time", value: args[1] || "No Time Given" },
            ]);
            const DMSuccessUnbanEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#77baed")
                .setTitle(`You have been unbanned from ${message.guild.name}`)
                .setDescription(`You have been unbanned from ${message.guild.name} by ${message.author} ${message.guild}`);
            const cannotBanMemberEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Error")
                .setDescription("You cannot ban this member");
            if (!message.member.permissions.has("BAN_MEMBERS")) {
                await message.reply({
                    embeds: [permissionError],
                });
                return;
            }
            if (member) {
                if (!args[1]) {
                    await member.send({ embeds: [DMSuccessBanned] });
                    await message.reply({ embeds: [successEmbed] });
                    const memberTarget = await message.guild?.members.ban(member);
                }
                else {
                    if (args[1].toLowerCase() === "inf" ||
                        args[1].toLowerCase() === "infinite") {
                        await member.send({ embeds: [DMSuccessBanned] });
                        await message.reply({ embeds: [successEmbed] });
                        await message.guild?.members.ban(member);
                    }
                    else {
                        await member.send({ embeds: [DMSuccessBannedTime] });
                        await message.reply({ embeds: [successEmbedTime] });
                        await message.guild?.members.ban(member);
                        setTimeout(async () => {
                            await message.guild?.members.unban(member.user);
                            await member.user.send({ embeds: [DMSuccessUnbanEmbed] });
                        }, (0, ms_1.default)(args[1]));
                    }
                }
            }
            else {
                await message.channel.send({ embeds: [cannotBanMemberEmbed] });
            }
        },
    },
};
module.exports = banCommand;
