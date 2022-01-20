import warnSchemas from "../schemas/warnSchemas";
import mongo from "../mongo";
import { Command } from "../interfaces";
import Discord from "discord.js";

const warnCommand: Command = {
  commandOption: {
    commandsAlias: ["warn"],
    minArgs: 1,
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
      let reason = args.filter((args, index) => index > 0).join(" ");
      if (!reason) reason = "No reason given.";
      const guildID = message.guildId;
      const userID = message.member.id;
      const DMSuccessEmbed = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(`You have been warned from ${message.guild!.name}`)
        .setDescription(
          `You have been warned in ${message.guild!.name} by ${message.author}!`
        )
        .addFields([{ name: "Reason", value: reason }]);
      const successEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor("#00ff80")
        .setTitle(":white_check_mark: Success!")
        .setDescription(`${target.user} have been warned`)
        .addFields([{ name: "Reason", value: reason }]);

      const warningObject = {
        author: message.member.user.tag,
        timestamp: new Date().getTime(),
        reason,
        target: target.user.tag,
      };

      target.user.send({ embeds: [DMSuccessEmbed] });
      message.reply({ embeds: [successEmbed] });

      const mongoose = await mongo();

      try {
        await warnSchemas.findOneAndUpdate(
          { guildID, userID },
          { guildID, userID, $push: { warnings: warningObject } },
          { upsert: true }
        );
      } catch (error) {
        console.error(error);
      } finally {
        mongoose.connection.close();
      }
    },
  },
};

export = warnCommand;
