"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const interfaces_1 = require("../interfaces");
(0, dotenv_1.config)();
const PREFIX = process.env.BOT_PREFIX;
function validatePermission(perms) {
    for (const perm of perms) {
        if (!(perm in interfaces_1.validPermissions)) {
            throw new Error(`Invalid permission: ${perm}`);
        }
    }
}
function default_1(client, commandOptions) {
    let { commandOption } = commandOptions;
    let { commandsAlias = "", permError = "", perms = [], requiredRoles = [], callback, } = commandOption;
    if (typeof commandsAlias === "string") {
        commandsAlias = [commandsAlias];
    }
    console.log("Registering command:", commandsAlias[0]);
    if (perms.length) {
        if (typeof perms === "string") {
            perms = [perms];
        }
        validatePermission(perms);
    }
    client.on("messageCreate", (message) => {
        const { content, guild, member } = message;
        if (message.channel.type !== "DM") {
            for (const alias of commandsAlias) {
                if (content.toLowerCase().startsWith(`${PREFIX}${alias.toLowerCase()}`)) {
                    for (const perm of perms) {
                        if (!member?.permissions.has(perm)) {
                            message.reply(permError);
                        }
                    }
                    for (const requiredRole of requiredRoles) {
                        const role = guild?.roles.cache.find((role) => role.name === requiredRole);
                        if (role) {
                            if (!role || !guild?.roles.cache.has(role.id)) {
                                message.reply(`You must have a role ${role} to use this command`);
                            }
                        }
                        else {
                            message.reply(`This guild does not have a role ${requiredRole}`);
                        }
                    }
                    const argumentsContent = content.split(/[ ]+/);
                    argumentsContent.shift();
                    // if (
                    //   argumentsContent.length < minArgs ||
                    //   (maxArgs !== null && arguments.length > maxArgs)
                    // ) {
                    //   message.reply(
                    //     `Incorrect syntax! Use ${PREFIX}${alias} ${expectedArgs}`
                    //   );
                    //   return;
                    // }
                    // callback(message, client, argumentsContent, argumentsContent.join(" "));
                    // console.log(argumentsContent.length);
                    // console.log(argumentsContent.length < minArgs);
                    // console.log(argumentsContent.length > maxArgs!);
                    callback(message, client, argumentsContent, argumentsContent.join(" "));
                    console.log("Command:", commandsAlias[0]);
                    return;
                }
            }
        }
    });
}
exports.default = default_1;
