import Discord from "discord.js";
import { Collection } from "../interfaces";

export = function (
  client: Discord.Client,
  commands: Collection,
  prefix: string
) {
  client.on("messageCreate", (msg) => {
    if (!msg.author.bot) {
      if (msg.channel.type !== "DM") {
        if (msg.content.startsWith(prefix)) {
          const args = msg.content.slice(prefix.length).trim().split(/ +/);

          const command = args.shift()?.toLowerCase();

          if (command) {
            if (commands.has(command)) {
              try {
                commands
                  .get(command)
                  ?.commandOption.callback(msg, client, args, args.join(" "));
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      }
    }
  });
};
