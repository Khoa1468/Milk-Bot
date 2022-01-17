"use strict";
const milkCommand = {
    commandOption: {
        commandsAlias: ["milk"],
        minArgs: 0,
        maxArgs: 0,
        async callback({ message }) {
            try {
                await message.reply("Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk Milk");
            }
            catch (error) {
                message.reply("Error: " + error.message);
            }
        },
    },
};
module.exports = milkCommand;
