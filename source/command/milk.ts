import { Command } from "../interfaces";

const milkCommand: Command = {
  commandOption: {
    commandsAlias: ["milk"],
    minArgs: 0,
    maxArgs: 0,
    async callback(message, client, args, text) {
      try {
        await message.reply(
          "Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk"
        );
      } catch (error: any) {
        message.reply("Error: " + error.message);
      }
    },
  },
};

export = milkCommand;
