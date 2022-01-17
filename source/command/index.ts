import { config } from "dotenv";
import Discord from "discord.js";
import { Command, validPermissions } from "../interfaces";
config();
const PREFIX = process.env.BOT_PREFIX;

function validatePermission<T extends keyof typeof validPermissions>(
  perms: T[] | T
) {
  for (const perm of perms) {
    if (!(perm in validPermissions)) {
      throw new Error(`Invalid permission: ${perm}`);
    }
  }
}

export default function (client: Discord.Client, commandOptions: Command) {
  let { commandOption } = commandOptions;

  let {
    commandsAlias = "",
    permError = "",
    perms = [],
    requiredRoles = [],
    callback,
  } = commandOption;

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
        if (
          content.toLowerCase().startsWith(`${PREFIX}${alias.toLowerCase()}`)
        ) {
          for (const perm of perms) {
            if (
              !member?.permissions.has(perm as Discord.PermissionResolvable)
            ) {
              message.reply(permError);
            }
          }

          for (const requiredRole of requiredRoles) {
            const role: Discord.Role | undefined = guild?.roles.cache.find(
              (role) => role.name === requiredRole
            );

            if (role) {
              if (!role || !guild?.roles.cache.has(role.id)) {
                message.reply(
                  `You must have a role ${role} to use this command`
                );
              }
            } else {
              message.reply(`This guild does not have a role ${requiredRole}`);
            }
          }

          const argumentsContent = content.split(/[ ]+/);
          argumentsContent.shift();

          callback(
            message,
            client,
            argumentsContent,
            argumentsContent.join(" ")
          );
          return;
        }
      }
    }
  });
}
