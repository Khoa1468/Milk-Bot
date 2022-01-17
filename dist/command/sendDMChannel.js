"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const sendDMChannelCommand = {
    commandOption: {
        commandsAlias: ["sendDMChannel", "sdm"],
        async callback({ message, client, args }) {
            const textToSend = args.filter((args, index) => index > 0).join(" ");
            const memberToSend = (await client.users.fetch(args[0])) ||
                client.users.cache.find((user) => user.tag === args[0] || user.id === args[0]);
            const userNotFoundEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Error")
                .setDescription(`Cannot find ${args[0]}`);
            const permissionErrorEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Permission Error")
                .setDescription("You don't have the permission to use this command.");
            const DMSendEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#77baed")
                .setTitle(`You have been DM by ${message.author.tag} from ${message.guild.name}`)
                .setDescription(`You have been DM by ${message.author}`)
                .addFields({
                name: "Message",
                value: textToSend || "No Message Given",
            });
            if (!message.member.permissions.has("ADMINISTRATOR"))
                return message.reply({ embeds: [permissionErrorEmbed] });
            if (!memberToSend)
                return message.reply({ embeds: [userNotFoundEmbed] });
            const cannotSendDMEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Error")
                .setDescription(`You cannot send DM to ${memberToSend}`);
            const successEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#00ff80")
                .setTitle(":white_check_mark: Success!")
                .setDescription(`DM has sent to ${memberToSend}`)
                .addFields({
                name: "Message",
                value: textToSend || "No Message Given",
            });
            try {
                await memberToSend.send({ embeds: [DMSendEmbed] });
                await message.reply({ embeds: [successEmbed] });
            }
            catch (error) {
                return message.reply({ embeds: [cannotSendDMEmbed] });
            }
        },
    },
};
module.exports = sendDMChannelCommand;
