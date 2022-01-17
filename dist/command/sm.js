"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = __importDefault(require("discord.js"));
const smCommand = {
    commandOption: {
        commandsAlias: ["sm", "slowmode"],
        async callback({ message, args, text }) {
            const NaNEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Failed!")
                .setDescription("You need to specify a number");
            const permissionErrorEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Failed!")
                .setDescription("You don't have the permission to use this command.");
            const notServerTextEmbed = new discord_js_1.default.MessageEmbed()
                .setColor("#ff1100")
                .setTitle(":x: Failed!")
                .setDescription("This command is only available in a server text channel");
            if (!args[0]) {
                await message.reply("Usage: m!ms <time/duration>");
                return;
            }
            let duration = args[0].toLowerCase();
            if (!message.member?.permissions.has("MANAGE_CHANNELS")) {
                await message.reply({ embeds: [permissionErrorEmbed] });
                return;
            }
            if (duration === "off") {
                duration = "0";
            }
            if (isNaN(parseInt(duration))) {
                await message.reply({ embeds: [NaNEmbed] });
                return;
            }
            if (parseInt(duration) > 21600) {
                duration = "21600";
            }
            if (parseInt(duration) < 0) {
                duration = "0";
            }
            if (message.channel.type !== "DM" &&
                message.channel.type !== "GUILD_NEWS") {
                const successEmbed = new discord_js_1.default.MessageEmbed()
                    .setColor("#00ff80")
                    .setTitle(":white_check_mark: Success!")
                    .setDescription(`Channel slowmode has set to ${duration}`);
                await message.channel.setRateLimitPerUser(parseInt(duration));
                await message.reply({ embeds: [successEmbed] });
            }
            else {
                await message.reply({ embeds: [notServerTextEmbed] });
                return;
            }
        },
    },
};
module.exports = smCommand;
