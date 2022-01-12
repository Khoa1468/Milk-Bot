import { Command } from "../interfaces";
import Discord from "discord.js";

const sendDMChannelCommand: Command = {
  commandOption: {
    commandsAlias: ["sendDMChannel", "sdm"],
    async callback(message, client, args, text) {
      const textToSend = args.filter((args, index) => index > 0).join(" ");
      const memberToSend =
        client.users.cache.find(
          (user) => user.tag === args[0] || user.id === args[0]
        ) || message.mentions.users.first();
      const userNotFoundEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Error")
        .setDescription(`Cannot find ${args[0]}`);
      const permissionErrorEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Permission Error")
        .setDescription("You don't have the permission to use this command.");
      const DMSendEmbed = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(
          `You have been DM by ${message.author.tag} from ${
            message.guild!.name
          }`
        )
        .setDescription(`You have been DM by ${message.author}`)
        .addFields({
          name: "Message",
          value: textToSend || "No Message Given",
        });

      if (!message.member!.permissions.has("ADMINISTRATOR"))
        return message.reply({ embeds: [permissionErrorEmbed] });
      if (!memberToSend) return message.reply({ embeds: [userNotFoundEmbed] });

      const cannotSendDMEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Error")
        .setDescription(`You cannot send DM to ${memberToSend!}`);

      const successEmbed = new Discord.MessageEmbed()
        .setColor("#00ff80")
        .setTitle(":white_check_mark: Success!")
        .setDescription(`DM has sent to ${memberToSend!}`)
        .addFields({
          name: "Message",
          value: textToSend || "No Message Given",
        });

      try {
        await memberToSend.send({ embeds: [DMSendEmbed] });
        await message.reply({ embeds: [successEmbed] });
      } catch (error) {
        return message.reply({ embeds: [cannotSendDMEmbed] });
      }
    },
  },
};

export = sendDMChannelCommand;
