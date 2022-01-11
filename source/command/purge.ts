import { Command } from "../interfaces";
import Discord from "discord.js";

const purgeCommand: Command = {
  commandOption: {
    commandsAlias: ["purge", "clear"],
    expectedArgs: "<number of message to purge>",
    minArgs: 1,
    maxArgs: 1,
    async callback(message, client, args, text) {
      let numberToDelete = parseInt(args[0]);
      try {
        let messages = await message.channel.messages.fetch({
          limit: numberToDelete,
        });
        if (message.channel.type !== "DM") {
          try {
            await message.channel.bulkDelete(messages);
            await message.channel.bulkDelete(1);
            const successEmbed = new Discord.MessageEmbed()
              .setTitle(":white_check_mark: Success!")
              .setDescription(
                "Successfully deleted " +
                  messages.size +
                  " message :wastebasket: "
              )
              .setColor("#00ff80");
            message.channel.send({ embeds: [successEmbed] });
            setTimeout(() => {
              if (message.channel.type !== "DM") {
                message.channel.bulkDelete(1);
              }
            }, 2000);
          } catch (err: any) {
            const errorEmbed = new Discord.MessageEmbed()
              .setColor("#ff1100")
              .setTitle(`:x: ${err.name}`)
              .setDescription(err.message);
            message.channel.send({
              embeds: [errorEmbed],
            });

            await message.channel.bulkDelete(1);
            setTimeout(() => {
              if (message.channel.type !== "DM") {
                message.channel.bulkDelete(1);
              }
            }, 2000);
          }
        }
      } catch (err: any) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#ff1100")
          .setTitle(`:x: ${err.name}`)
          .setDescription(err.message);
        message.channel.send({
          embeds: [errorEmbed],
        });
        if (message.channel.type !== "DM") {
          await message.channel.bulkDelete(1);
        }
        setTimeout(() => {
          if (message.channel.type !== "DM") {
            message.channel.bulkDelete(1);
          }
        }, 2000);
        return;
      }
    },
  },
};

export = purgeCommand;
