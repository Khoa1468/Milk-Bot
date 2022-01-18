import { Command } from "../interfaces";
import Discord from "discord.js";

const smCommand: Command = {
  commandOption: {
    commandsAlias: ["sm", "slowmode"],
    async callback({ message, args, text }) {
      const NaNEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Failed!")
        .setDescription("You need to specify a number");
      const permissionErrorEmbed: Discord.MessageEmbed =
        new Discord.MessageEmbed()
          .setColor("#ff1100")
          .setTitle(":x: Failed!")
          .setDescription("You don't have the permission to use this command.");
      const notServerTextEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Failed!")
        .setDescription(
          "This command is only available in a server text channel"
        );

      if (!args[0]) {
        await message.reply("Usage: m!sm <time/duration>");
        return;
      }

      let duration: string = args[0].toLowerCase();

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

      if (
        message.channel.type !== "DM" &&
        message.channel.type !== "GUILD_NEWS"
      ) {
        const successEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
          .setColor("#00ff80")
          .setTitle(":white_check_mark: Success!")
          .setDescription(`Channel slowmode has set to ${duration}`);
        await message.channel.setRateLimitPerUser(parseInt(duration));
        await message.reply({ embeds: [successEmbed] });
      } else {
        await message.reply({ embeds: [notServerTextEmbed] });
        return;
      }
    },
  },
};

export = smCommand;
