import { CommandOptions, Command } from "../interfaces";
import Discord from "discord.js";

const pingCommand: Command = {
  commandOption: {
    commandsAlias: ["ping"],
    minArgs: 0,
    maxArgs: 0,
    callback({ message, client }) {
      const embed = new Discord.MessageEmbed()
        .setColor("#77baed")
        .setTitle("Pong! :ping_pong:")
        .setDescription(`:ping_pong: ${client.ws.ping}ms`);

      // message.reply(embed);
      //   message.channel.send("pong! :ping_pong: " + client.ws.ping + "ms");
      message.reply({ embeds: [embed] });
    },
  },
};

export = pingCommand;
// module.exports = pingCommand;
