import Discord from "discord.js";
import { config } from "dotenv";
import path from "path";
import * as fs from "fs";
import command from "./command";
config();
const TOKEN = process.env.BOT_TOKEN;
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
});
client.setMaxListeners(0);
const PREFIX = process.env.BOT_PREFIX;

client.on("ready", () => {
  console.log(`Logged in as ${client.user!.tag}!`);
  const baseFile = "index.js";

  function readCommand(dir: string) {
    const files = fs
      .readdirSync(path.join(__dirname, dir))
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommand(path.join(dir, file));
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        command(client, option);
      }
    }
  }
  readCommand("command");
});

client.login(TOKEN);
