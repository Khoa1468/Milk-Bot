import warnSchemas from "../schemas/warnSchemas";
import mongo from "../mongo";
import { Command } from "../interfaces";
import Discord from "discord.js";

const listWarningCommand: Command = {
  commandOption: {
    commandsAlias: ["listWarning", "lw"],
    async callback({ message, args }) {
      const permissionError: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Permission Error")
        .setDescription("You don't have the permission to use this command.");
      if (!message.member?.permissions.has("ADMINISTRATOR"))
        return message.reply({ embeds: [permissionError] });
      const target = message.mentions.members!.first();
      const cannotFindMember: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Cannot find member")
        .setDescription("Please mention a valid member of this server");
      if (!target) return message.reply({ embeds: [cannotFindMember] });
      const guildID = message.guildId;
      const userID = message.member.id;

      const mongoose = await mongo();

      try {
        const result = await warnSchemas.findOne({ guildID, userID });
        let reply = `Previous warnings for <@${userID}>\n\n`;

        for (const warning of result.warnings) {
          if (warning.target === target.user.tag) {
            reply += `${warning.target} was warned by ${warning.author} for ${
              warning.reason
            } on ${new Date(warning.timestamp).toString()}\n\n`;
          }
        }

        message.channel.send(reply);
      } finally {
        mongoose.connection.close();
      }
    },
  },
};

export = listWarningCommand;
