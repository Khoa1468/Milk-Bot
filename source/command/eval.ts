import { Command, CommandArguments } from "../interfaces";
import Discord from "discord.js";

const ownerID = "597592685129498644";
const channelID = "924950898839531540";

const evalCommand: Command = {
  commandOption: {
    commandsAlias: ["eval", "e"],
    async callback({ message, client, args, text }) {
      const result = eval(text);

      const successEmbed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Success")
        .addFields(
          { name: "Input", value: `\`\`\`ts\n${text}\`\`\`` },
          { name: "Output", value: `\`\`\`ts\n${result}\`\`\`` },
          { name: "Type", value: `\`\`\`ts\n${typeof result}\`\`\`` }
        );
      if (message.author.id === ownerID && message.channelId === channelID) {
        await message.channel.send({ embeds: [successEmbed] });
      }
    },
  },
};

export = evalCommand;
