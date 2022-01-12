import { Command } from "../interfaces";
import Discord from "discord.js";
import ms from "ms";

const banCommand: Command = {
  commandOption: {
    commandsAlias: ["ban", "b"],
    minArgs: 1,
    maxArgs: 1,
    async callback(message, client, args, text) {
      const member = message.mentions.members?.first();
      if (!member)
        return message.reply("Please mention a valid member of this server");
      const reasonText = args.filter((args, index) => index > 1).join(" ");
      const permissionError = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Permission Error")
        .setDescription("You don't have the permission to use this command.");
      const DMSuccessBanned = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(`You have been banned from ${message.guild!.name}`)
        .setDescription(
          `You have been banned from ${message.guild!.name} by ${
            message.author
          } ${message.guild}`
        )
        .addFields([
          { name: "Reason", value: reasonText || "No Reason Given" },
        ]);
      const DMSuccessBannedTime = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(`You have been banned from ${message.guild!.name}`)
        .setDescription(
          `You have been banned from ${message.guild!.name} by ${
            message.author
          } ${message.guild}`
        )
        .addFields([
          { name: "Reason", value: reasonText || "No Reason Given" },
          { name: "Time", value: args[1] || "No Time Given" },
        ]);
      const successEmbed = new Discord.MessageEmbed()
        .setColor("#00ff80")
        .setTitle(":white_check_mark: Success!")
        .setDescription(`${member.user} have been banned`)
        .addFields([
          { name: "Reason", value: reasonText || "No Reason Given" },
        ]);
      const successEmbedTime = new Discord.MessageEmbed()
        .setColor("#00ff80")
        .setTitle(":white_check_mark: Success!")
        .setDescription(`${member.user} have been banned`)
        .addFields([
          { name: "Reason", value: reasonText || "No Reason Given" },
          { name: "Time", value: args[1] || "No Time Given" },
        ]);
      const DMSuccessUnbanEmbed = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(`You have been unbanned from ${message.guild!.name}`)
        .setDescription(
          `You have been unbanned from ${message.guild!.name} by ${
            message.author
          } ${message.guild}`
        );
      const cannotBanMemberEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Error")
        .setDescription("You cannot ban this member");
      if (!message.member!.permissions.has("BAN_MEMBERS")) {
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
        } else {
          if (
            args[1].toLowerCase() === "inf" ||
            args[1].toLowerCase() === "infinite"
          ) {
            await member.send({ embeds: [DMSuccessBanned] });
            await message.reply({ embeds: [successEmbed] });
            await message.guild?.members.ban(member);
          } else {
            await member.send({ embeds: [DMSuccessBannedTime] });
            await message.reply({ embeds: [successEmbedTime] });
            await message.guild?.members.ban(member);

            setTimeout(async () => {
              await message.guild?.members.unban(member.user);
              await member.user.send({ embeds: [DMSuccessUnbanEmbed] });
            }, ms(args[1]));
          }
        }
      } else {
        await message.channel.send({ embeds: [cannotBanMemberEmbed] });
      }
    },
  },
};

export = banCommand;
