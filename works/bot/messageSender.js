const { messageConfig } = require('./config.js');

const sendMessageInterval = async (client) => {
  const { channelId, messageText, messageInterval } = messageConfig;
  try {
    const channel = await client.channels.fetch(channelId);
    if (channel && channel.isText) {
      setInterval(() => {
        console.log(messageText);
        channel.send(messageText);
      }, messageInterval);
    } else {
      console.error('Specified channel not found or is not a text channel.');
    }
  } catch (error) {
    console.error('Failed to fetch channel:', error);
  }
};

module.exports = sendMessageInterval;
