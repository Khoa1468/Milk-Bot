import { Command } from "../interfaces";
import Discord from "discord.js";

const funCommand: Command = {
  commandOption: {
    commandsAlias: ["fun", "f"],
    minArgs: 0,
    maxArgs: 0,
    async callback(message, client, args, text) {
      try {
        const funEmbed = new Discord.MessageEmbed()
          .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
          .setTitle("Fun")
          .setDescription("Click Embed To Fun");
        await message.reply({ embeds: [funEmbed] });
      } catch (error: any) {
        message.reply("Error: " + error.message);
      }
    },
  },
};

export = funCommand;
