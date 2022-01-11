"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const muteCommand = {
    commandOption: {
        commandsAlias: ["mute"],
        minArgs: 1,
        maxArgs: 2,
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
                    .setDescription("User have been muted")
                    .addFields({ name: "Reason", value: args[1] || "No Reason Given" });
                let mainRole = message.guild?.roles.cache.find((role) => role.name === "Nhân Dân");
                let muteRole = message.guild?.roles.cache.find((role) => role.name === "Tù Nhân");
                const target = message.guild?.members.cache.get(member.id);
                target?.roles.remove(mainRole);
                target?.roles.add(muteRole);
                await message.reply({ embeds: [successEmbed] });
                await member.send({
                    embeds: [
                        new discord_js_1.default.MessageEmbed()
                            .setColor("#77baed")
                            .setTitle(`You have been muted by ${message.author.tag}`)
                            .setDescription(`You have been muted by ${message.author}`)
                            .addFields({
                            name: "Reason",
                            value: args[1] || "No Reason Given",
                        }),
                    ],
                });
                return;
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
module.exports = muteCommand;
