import { Command } from "../interfaces";
import Discord from "discord.js";
import ms from "ms";

const muteCommand: Command = {
  commandOption: {
    commandsAlias: ["mute"],
    minArgs: 1,
    maxArgs: 2,
    async callback(message, client, args, text) {
      const textReason = args.filter((args, index) => index > 1).join(" ");
      const userNotFoundEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Failed!")
        .setDescription("User not found");
      const permissionErrorEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Permission Error")
        .setDescription("You don't have the permission to use this command.");
      const successEmbed = new Discord.MessageEmbed()
        .setColor("#00ff80")
        .setTitle(":white_check_mark: Success!")
        .setDescription("User have been muted")
        .addFields({
          name: "Reason",
          value: textReason || "No Reason Given",
        });
      const successEmbedTime = new Discord.MessageEmbed()
        .setColor("#00ff80")
        .setTitle(":white_check_mark: Success!")
        .setDescription("User have been muted")
        .addFields([
          { name: "Reason", value: textReason || "No Reason Given" },
          { name: "Time", value: args[1] || "No Time Given" },
        ]);
      const DMSuccessEmbed = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(`You have been muted by ${message.author.tag}`)
        .setDescription(`You have been muted by ${message.author}`)
        .addFields({
          name: "Reason",
          value: textReason || "No Reason Given",
        });
      const DMSuccessEmbedTime = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle(`You have been muted by ${message.author.tag}`)
        .setDescription(`You have been muted by ${message.author}`)
        .addFields([
          {
            name: "Reason",
            value: textReason || "No Reason Given",
          },
          { name: "Time", value: args[1] || "No Time Given" },
        ]);
      const alreadyMuteErrorEmbed = new Discord.MessageEmbed()
        .setColor("#ff1100")
        .setTitle(":x: Failed!")
        .setDescription("User Already Muted");
      const DMUnmutedTimeOutSuccessEmbed = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle("You have been unmuted!")
        .setDescription("You have been unmuted!");
      if (!message.member?.permissions.has("ADMINISTRATOR")) {
        await message.reply({
          embeds: [permissionErrorEmbed],
        });
        return;
      }
      const member = message.mentions.members?.first();
      if (member) {
        let mainRole = message.guild?.roles.cache.find(
          (role) => role.name === "Nhân Dân"
        );
        let muteRole = message.guild?.roles.cache.find(
          (role) => role.name === "Tù Nhân"
        );

        if (!args[1]) {
          const target = message.guild?.members.cache.get(member.id);

          if (
            !target?.roles.cache.has(mainRole!.id) &&
            target?.roles.cache.has(muteRole!.id)
          ) {
            return message.reply({ embeds: [alreadyMuteErrorEmbed] });
          }

          await target?.roles.remove(mainRole!);
          await target?.roles.add(muteRole!);

          await message.reply({ embeds: [successEmbed] });

          await member.send({
            embeds: [DMSuccessEmbed],
          });
        } else {
          if (
            args[1].toLowerCase() === "inf" ||
            args[1].toLowerCase() === "infinite"
          ) {
            const target = message.guild?.members.cache.get(member.id);
            await target?.roles.remove(mainRole!);
            await target?.roles.add(muteRole!);

            await message.reply({ embeds: [successEmbed] });

            await member.send({
              embeds: [DMSuccessEmbed],
            });
          } else {
            const target = message.guild?.members.cache.get(member.id);
            await target?.roles.remove(mainRole!);
            await target?.roles.add(muteRole!);

            await message.reply({ embeds: [successEmbedTime] });

            await member.send({
              embeds: [DMSuccessEmbedTime],
            });

            setTimeout(async () => {
              await target?.roles.add(mainRole!);
              await target?.roles.remove(muteRole!);
              await member.send({ embeds: [DMUnmutedTimeOutSuccessEmbed] });
            }, ms(args[1]));
          }
        }

        return;
      } else {
        await message.reply({ embeds: [userNotFoundEmbed] });
        return;
      }
    },
  },
};

export = muteCommand;
