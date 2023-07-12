const { Client } = require('discord.js');
const { clientOptions, TOKEN, CHANNEL_ID, passwordRoles, roles, canUseCommand } = require('./config.js');
const assignRole = require('./roleAssignment.js');
const { sendReport, sendMessageToMe } = require('./messageHandler.js');
const { addBotRole, addRole } = require('./roleHandler.js');
const { playBackgroundMusic } = require('./youtubeHandler.js');
const sendMessageInterval = require('./messageSender.js');

const client = new Client(clientOptions);

client.once('ready', () => {
  console.log('test_Bot is ready!');
  sendMessageInterval(client);
});

client.on('guildMemberAdd', (member) => {
  assignRole(member, passwordRoles, CHANNEL_ID);
});

client.on('messageCreate', async (msg) => {
  console.log('Message received:', msg);

  if (msg.channel.type === 'dm' && !msg.author.bot) {
    if (msg.content.startsWith('!report')) {
      const args = msg.content.slice(7).trim().split(/ +/);
      const username = args.shift();
      const reportMessage = args.join(' ');

      sendReport(client, msg, username, reportMessage);
    } else if (msg.content.startsWith('!m')) {
      const args = msg.content.slice(3).trim().split(/ +/);
      const targetMessage = args.join(' ');

      sendMessageToMe(client, msg, targetMessage);
    }
  } else {
    if (msg.author.bot) {
      await addBotRole(msg, roles['botRole']);
    }

    if (msg.content.startsWith('!msg')) {
      if (canUseCommand(msg.member)) {
        const args = msg.content.slice(5).trim().split(/ +/);
        const messageText = args.join(' ');
        msg.channel.send(args.join(" "));
        client.channels.cache.get('887199795985412098').send(args.join(" "));
      } else {
        msg.channel.send('You do not have permission to use this command.');
      }
    } else if (msg.content.startsWith('!role')) {
      const args = msg.content.slice(6).trim().split(/ +/);
      const roleName = args.shift();
      addRole(msg, roleName);
    } else if (msg.content.includes('youtube.com')) {
      playBackgroundMusic(msg);
    }
  }
});

client.login(TOKEN);