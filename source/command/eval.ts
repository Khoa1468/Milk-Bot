import { Command, CommandArguments } from "../interfaces";
import Discord from "discord.js";

const ownerID = "597592685129498644";
const channelID = "924950898839531540";

const evalCommand: Command = {
  commandOption: {
    commandsAlias: ["eval", "e"],
    async callback({ message, client, args, text }) {
      try {
        if (message.author.id === ownerID && message.channelId === channelID) {
          try {
            const result = eval(text);

            const successEmbed = new Discord.MessageEmbed()
              .setColor("#00ff00")
              .setTitle("Success")
              .addFields(
                { name: "Input", value: `\`\`\`js\n${text}\`\`\`` },
                { name: "Output", value: `\`\`\`js\n${result}\`\`\`` },
                { name: "Type", value: `\`\`\`js\n${typeof result}\`\`\`` }
              );
            await message.channel.send({ embeds: [successEmbed] });
          } catch (error) {
            const errorEmbed = new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTitle("Error")
              .setDescription("Some Error Was Occured When Execute The Command")
              .addFields([
                { name: "Input", value: `\`\`\`js\n${text}\`\`\`` },
                { name: "Output", value: `\`\`\`js\n${error}\`\`\`` },
              ]);
            await message.channel.send({ embeds: [errorEmbed] });
          }
        }
      } catch (error) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setTitle("Error")
          .setDescription("Some Error Was Occured When Execute The Command")
          .addFields([
            { name: "Input", value: `\`\`\`js\n${text}\`\`\`` },
            { name: "Output", value: `\`\`\`js\n${error}\`\`\`` },
          ]);
        await message.channel.send({ embeds: [errorEmbed] });
      }
    },
  },
};

export = evalCommand;
