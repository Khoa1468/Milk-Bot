"use strict";
const unbanCommand = {
    commandOption: {
        commandsAlias: ["unban"],
        minArgs: 1,
        maxArgs: 1,
        async callback(message, client, args, text) {
            try {
                const memberUnban = await message.guild.members.unban(args[1]);
                await message.reply("Unbanned " + memberUnban.tag);
            }
            catch (error) {
                await message.reply(`User ${args[1]} is not unbanned`);
            }
        },
    },
};
module.exports = unbanCommand;
