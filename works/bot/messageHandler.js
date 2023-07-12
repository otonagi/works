// messageHandler.js
const { MessageEmbed } = require('discord.js');
const { REPORT_CHANNEL_ID, My_ID } = require('./config.js');

// レポートを送信する関数
const sendReport = (client, message, username, reportMessage) => {
  const reportEmbed = new MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Report')
    .addField('User', username)
    .addField('Message', reportMessage);

  const reportChannel = client.channels.cache.get(REPORT_CHANNEL_ID);
  if (reportChannel && reportChannel.isText()) {
    reportChannel.send(reportEmbed);
    message.channel.send('Your report has been submitted.');
  } else {
    console.error('Specified report channel not found.');
    message.channel.send('Failed to submit report.');
  }
};

// my_idにメッセージを送信する関数
const sendMessageToMe = async (client, message, targetMessage) => {
  const targetDMChannel = await client.users.fetch(My_ID).createDM();
  if (targetDMChannel) {
    const replyEmbed = new MessageEmbed()
      .setColor('#0000FF')
      .setTitle('New Message')
      .setDescription(`${message.author.tag}からメッセージが届いています。`)
      .addField('Message', targetMessage);

    targetDMChannel.send(replyEmbed);
    message.channel.send('Your message has been sent to the target user.');
  } else {
    console.error('Failed to create DM channel with the target user.');
    message.channel.send('Failed to send your message to the target user.');
  }
};

module.exports = {
  sendReport,
  sendMessageToMe
};
