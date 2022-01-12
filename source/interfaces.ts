import Discord from "discord.js";

export const validPermissions = {
  CREATE_INSTANT_INVITE: 0,
  KICK_MEMBERS: 0,
  BAN_MEMBERS: 0,
  ADMINISTRATOR: 0,
  MANAGE_CHANNELS: 0,
  MANAGE_GUILD: 0,
  ADD_REACTIONS: 0,
  VIEW_AUDIT_LOG: 0,
  PRIORITY_SPEAKER: 0,
  STREAM: 0,
  VIEW_CHANNEL: 0,
  SEND_MESSAGES: 0,
  SEND_TTS_MESSAGES: 0,
  MANAGE_MESSAGES: 0,
  EMBED_LINKS: 0,
  ATTACH_FILES: 0,
  READ_MESSAGE_HISTORY: 0,
  MENTION_EVERYONE: 0,
  USE_EXTERNAL_EMOJIS: 0,
  VIEW_GUILD_INSIGHTS: 0,
  CONNECT: 0,
  SPEAK: 0,
  MUTE_MEMBERS: 0,
  DEAFEN_MEMBERS: 0,
  MOVE_MEMBERS: 0,
  USE_VAD: 0,
  CHANGE_NICKNAME: 0,
  MANAGE_NICKNAMES: 0,
  MANAGE_ROLES: 0,
  MANAGE_WEBHOOKS: 0,
  MANAGE_EMOJIS: 0,
};

export interface CommandOptions {
  commandsAlias: string[] | string;
  expectedArgs?: string;
  permError?: string;
  minArgs?: number;
  maxArgs?: number;
  perms?: (keyof typeof validPermissions)[] | keyof typeof validPermissions;
  requiredRoles?: string[] | string;
  callback: (
    message: Discord.Message,
    client: Discord.Client,
    args: any[],
    argsJoined: string
  ) => void;
}

export interface Command {
  commandOption: CommandOptions;
}

export type Collection = Discord.Collection<string, Command>;
