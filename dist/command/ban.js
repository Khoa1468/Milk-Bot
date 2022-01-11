"use strict";
const banCommand = {
    commandOption: {
        commandsAlias: ["ban", "b"],
        minArgs: 1,
        maxArgs: 1,
        perms: ["ADMINISTRATOR"],
        async callback(message, client, args, text) {
            const member = message.mentions.members?.first();
            if (member) {
                const memberTarget = await message.guild?.members.ban(member, {
                    reason: args[2],
                });
                await message.reply("User have been banned");
            }
            else {
                message.channel.send("You could't ban member");
            }
        },
    },
};
module.exports = banCommand;
