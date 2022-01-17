import { Command } from "../interfaces";
import Discord from "discord.js";

const kickCommand: Command = {
  commandOption: {
    commandsAlias: ["kick", "k"],
    minArgs: 1,
    maxArgs: 1,
    async callback({ message, args }) {
      const member = message.mentions.members?.first();
      const reasonText = args.filter((args, index) => index > 0).join(" ");
      const userNotFoundEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Failed!")
        .setDescription("User not found");
      const permissionErrorEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Permission Error")
        .setDescription("You don't have the permission to use this command.");
      const DMSuccessKickedEmbed = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(`You have been kicked from ${message.guild!.name}`)
        .setDescription(
          `You have been kicked from ${message.guild!.name} by ${
            message.author
          } ${message.guild}`
        )
        .addFields([
          { name: "Reason", value: reasonText || "No Reason Given" },
        ]);
      if (!member) {
        return message.reply({ embeds: [userNotFoundEmbed] });
      }
      const successEmbed = new Discord.MessageEmbed()
        .setColor("#00ff80")
        .setTitle(":white_check_mark: Success!")
        .setDescription(`${member.user} have been kicked`)
        .addFields([
          { name: "Reason", value: reasonText || "No Reason Given" },
        ]);
      if (!message.member!.permissions.has("KICK_MEMBERS")) {
        await message.reply({
          embeds: [permissionErrorEmbed],
        });
        return;
      }
      if (member) {
        await member.send({
          embeds: [DMSuccessKickedEmbed],
        });
        await message.reply({ embeds: [successEmbed] });
        await message.guild?.members.kick(member, args[1]);
      } else {
        await message.channel.send("You could't kick member");
      }
    },
  },
};

export = kickCommand;
