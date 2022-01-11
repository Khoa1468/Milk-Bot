import { Command } from "../interfaces";
import Discord from "discord.js";

const kickCommand: Command = {
  commandOption: {
    commandsAlias: ["kick", "k"],
    minArgs: 1,
    maxArgs: 1,
    async callback(message, client, args, text) {
      const member = message.mentions.members?.first();
      if (!message.member!.permissions.has("KICK_MEMBERS")) {
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
      if (member) {
        await member.send({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("#77baed")
              .setTitle(`You have been kicked by ${message.author.tag}`)
              .setDescription(`You have been kicked by ${message.author}`)
              .addFields({
                name: "Reason:",
                value: args[1] ? String(args[1]) : "No Reason Given",
              }),
          ],
        });
        await message.guild?.members.kick(member, args[1]);
        await message.reply("User have been kicked");
      } else {
        await message.channel.send("You could't kick member");
      }
    },
  },
};

export = kickCommand;
