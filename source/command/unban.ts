import { Command } from "../interfaces";
import Discord from "discord.js";

const unbanCommand: Command = {
  commandOption: {
    commandsAlias: ["unban"],
    minArgs: 1,
    maxArgs: 1,
    async callback(message, client, args, text) {
      const permissionErrorEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Permission Error")
        .setDescription("You don't have the permission to use this command.");
      const DMSuccessUnbanEmbed = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(`You have been unbanned from ${message.guild!.name}`)
        .setDescription(
          `You have been unbanned from ${message.guild!.name} by ${
            message.author
          } ${message.guild}`
        );
      const userNotFoundEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Failed!")
        .setDescription("User to unban not found");
      const cannotUnbanEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Failed!")
        .setDescription("You cannot unban this user");
      const cannotFetchBannedUsersEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Failed!")
        .setDescription("Cannot fetch banned users");
      const guildBanUsers = await message.guild?.bans.fetch();
      if (!guildBanUsers)
        return message.reply({ embeds: [cannotFetchBannedUsersEmbed] });
      const memberTarget = guildBanUsers?.find(
        (m) => m.user.tag === args[0] || m.user.id === args[0]
      )?.user;
      const successUnbanEmbed = new Discord.MessageEmbed()
        .setColor("#00ff80")
        .setTitle(":white_check_mark: Success!")
        .setDescription(`${memberTarget} have been unbanned`);
      if (!message.member!.permissions.has("BAN_MEMBERS")) {
        await message.reply({
          embeds: [permissionErrorEmbed],
        });
        return;
      }
      try {
        if (memberTarget) {
          const memberUnban = await message.guild!.members.unban(memberTarget);
          await message.reply({ embeds: [successUnbanEmbed] });
          await memberTarget.send({ embeds: [DMSuccessUnbanEmbed] });
        } else {
          return message.reply({ embeds: [userNotFoundEmbed] });
        }
      } catch (error) {
        await message.reply({ embeds: [cannotUnbanEmbed] });
      }
    },
  },
};

export = unbanCommand;
