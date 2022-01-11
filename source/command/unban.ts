import { Command } from "../interfaces";
import Discord from "discord.js";

const unbanCommand: Command = {
  commandOption: {
    commandsAlias: ["unban"],
    minArgs: 1,
    maxArgs: 1,
    async callback(message, client, args, text) {
      if (!message.member!.permissions.has("BAN_MEMBERS")) {
        await message.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("#ff1100")
              .setTitle(":x: Permission Error")
              .setDescription(
                "You don't have the permission to use this command."
              ),
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
        const memberUnban = await message.guild!.members.unban(args[0]);
        await message.reply("Unbanned " + memberUnban.tag);
      } catch (error) {
        await message.reply(`User ${args[1]} is not unbanned`);
      }
    },
  },
};

export = unbanCommand;
