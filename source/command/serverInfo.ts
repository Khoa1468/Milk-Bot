import { Command } from "../interfaces";
import Discord from "discord.js";

const serverInfoCommand: Command = {
  commandOption: {
    commandsAlias: ["serverinfo", "si", "guildinfo", "gi"],
    minArgs: 0,
    maxArgs: 0,
    async callback(message, client, args, text) {
      try {
        const { guild } = message;
        const {
          name,
          channels,
          afkChannel,
          createdAt,
          ownerId,
          icon,
          iconURL,
          description,
          roles,
          rulesChannel,
          members,
          memberCount,
        } = guild!;
        const owner = await guild?.members.fetch({ user: ownerId });
        const guildEmbed = new Discord.MessageEmbed()
          .setColor("#03e3fc")
          .setTitle(`Info Of ${name}`)
          .addFields([
            { name: "Server Name", value: name },
            { name: "Total Member", value: memberCount.toString() },
            { name: "Owner", value: `${owner} ${owner?.user.tag}` },
            { name: "Created At", value: createdAt.toString() },
            {
              name: "Server Description",
              value: description ? description : "No Description",
            },
            {
              name: "Server Rules Channel",
              value: rulesChannel ? `${rulesChannel}` : "No Rules Channel",
            },
            { name: "Total Roles", value: roles.cache.size.toString() },
            { name: "Total Channels", value: channels.cache.size.toString() },
            {
              name: "Total Text Channel",
              value: channels.cache
                .filter((channel) => channel.type === "GUILD_TEXT")
                .size.toString(),
            },
            {
              name: "Total Voice Channel",
              value: channels.cache
                .filter((channel) => channel.type === "GUILD_VOICE")
                .size.toString(),
            },
            {
              name: "Total Category",
              value: channels.cache
                .filter((channel) => channel.type === "GUILD_CATEGORY")
                .size.toString(),
            },
            {
              name: "Total Announcement",
              value: channels.cache
                .filter((channels) => channels.type === "GUILD_NEWS")
                .size.toString(),
            },
            {
              name: "Total Store",
              value: channels.cache
                .filter((channels) => channels.type === "GUILD_STORE")
                .size.toString(),
            },
            {
              name: "Total Voice Stage Channel",
              value: channels.cache
                .filter((channels) => channels.type === "GUILD_STAGE_VOICE")
                .size.toString(),
            },
            {
              name: "AFK Channel",
              value: afkChannel ? `${afkChannel}` : "No AFK Channel",
            },
          ]);
        // message.reply(`${owner}`);
        message.channel.send({ embeds: [guildEmbed] });
      } catch (error: any) {
        console.log(error);
        message.reply("Error: " + error.message);
      }
    },
  },
};

export = serverInfoCommand;
