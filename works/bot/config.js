const { GatewayIntentBits } = require('discord.js');

const clientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions
  ]
};

const TOKEN = 'my_token';
const CHANNEL_ID = 'logs_channel_id'; // ID of the channel to send logs
const REPORT_CHANNEL_ID = 'report_channel_id'; // ID of the channel to send reports

// my_id
const My_ID = 'my_account_id'

const passwordRoles = {
  'password1': 'role1_id', // Replace with the role ID corresponding to password 1
  'password2': 'role2_id' // Replace with the role ID corresponding to password 2
};

const roles = {
    'botRole' : 'bot_id',
    'specific_role1': 'specific_role1_id', // Role ID corresponding to role1
    'specific_role2': 'specific_role2_id' // Role ID corresponding to role2
};

const messageConfig = {
  channelId: 'message_channel_id', // 送信先のチャンネルID
  messageInterval: 60000, // メッセージ送信の間隔（ミリ秒）
  messageText: '/ping' // 送信するメッセージのテキスト
}

function canUseCommand(member) {
  // roleAとroleBの役職IDを指定
  const roleAId = '役職AのID';
  const roleBId = '役職BのID';

  const hasRoleA = member.roles.cache.has(roleAId);
  const hasRoleB = member.roles.cache.has(roleBId);

  return hasRoleA || hasRoleB;
};

module.exports = {
  clientOptions,
  TOKEN,
  CHANNEL_ID,
  REPORT_CHANNEL_ID,
  My_ID,
  passwordRoles,
  roles,
  messageConfig,
  canUseCommand
};
