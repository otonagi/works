const ytdl = require('ytdl-core');

// YouTube関連の処理
const playBackgroundMusic = (message) => {
  const voiceChannel = message.member?.voice?.channel;
  if (!voiceChannel) {
    // return message.channel.send('You need to be connected to a voice channel.');
    return message.channel.send('ボイスチャンネルに入ってから実行してください.');
  }

  voiceChannel.join()
    .then((connection) => {
      const stream = ytdl(message.content, { filter: 'audioonly' });
      const dispatcher = connection.play(stream);

      dispatcher.on('finish', () => {
        voiceChannel.leave();
      });

      message.channel.send('Playing background music.');
    })
    .catch((error) => {
      console.error('Failed to connect to voice channel:', error);
    });
};

module.exports = {
  playBackgroundMusic
};
