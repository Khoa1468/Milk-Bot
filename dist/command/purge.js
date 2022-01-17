"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const purgeCommand = {
    commandOption: {
        commandsAlias: ["purge", "clear"],
        expectedArgs: "<number of message to purge>",
        minArgs: 1,
        maxArgs: 1,
        async callback({ message, args }) {
            let numberToDelete = parseInt(args[0]);
            if (!message.member.permissions.has("MANAGE_MESSAGES")) {
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
            if (!args[0]) {
                await message.reply({
                    embeds: [
                        new discord_js_1.default.MessageEmbed()
                            .setColor("#ff1100")
                            .setTitle(":x: Amount Error")
                            .setDescription("Please specify the amount of messages to delete."),
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
                let messages = await message.channel.messages.fetch({
                    limit: numberToDelete,
                });
                if (message.channel.type !== "DM") {
                    try {
                        await message.channel.bulkDelete(messages);
                        await message.channel.bulkDelete(1);
                        const successEmbed = new discord_js_1.default.MessageEmbed()
                            .setTitle(":white_check_mark: Success!")
                            .setDescription("Successfully deleted " +
                            messages.size +
                            " message :wastebasket: ")
                            .setColor("#00ff80");
                        await message.channel.send({ embeds: [successEmbed] });
                        setTimeout(async () => {
                            if (message.channel.type !== "DM") {
                                await message.channel.bulkDelete(1);
                            }
                        }, 2000);
                    }
                    catch (err) {
                        const errorEmbed = new discord_js_1.default.MessageEmbed()
                            .setColor("#ff1100")
                            .setTitle(`:x: ${err.name}`)
                            .setDescription(err.message);
                        await message.channel.send({
                            embeds: [errorEmbed],
                        });
                        await message.channel.bulkDelete(1);
                        setTimeout(async () => {
                            if (message.channel.type !== "DM") {
                                await message.channel.bulkDelete(1);
                            }
                        }, 2000);
                    }
                }
            }
            catch (err) {
                const errorEmbed = new discord_js_1.default.MessageEmbed()
                    .setColor("#ff1100")
                    .setTitle(`:x: ${err.name}`)
                    .setDescription(err.message);
                await message.channel.send({
                    embeds: [errorEmbed],
                });
                if (message.channel.type !== "DM") {
                    await message.channel.bulkDelete(1);
                }
                setTimeout(async () => {
                    if (message.channel.type !== "DM") {
                        await message.channel.bulkDelete(1);
                    }
                }, 2000);
                return;
            }
        },
    },
};
module.exports = purgeCommand;
