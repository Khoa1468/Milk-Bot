"use strict";
const kickCommand = {
    commandOption: {
        commandsAlias: ["kick", "k"],
        minArgs: 1,
        maxArgs: 1,
        perms: ["ADMINISTRATOR"],
        async callback(message, client, args, text) {
            const member = message.mentions.members?.first();
            if (member) {
                const memberTarget = await message.guild?.members.kick(member, args[2]);
                await message.reply("User have been kicked");
            }
            else {
                message.channel.send("You could't kick member");
            }
        },
    },
};
module.exports = kickCommand;
