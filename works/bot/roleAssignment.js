const { MessageEmbed } = require('discord.js');

const assignRole = async (member, passwordRoles, CHANNEL_ID) => {
  const channel = member.guild.channels.cache.get(CHANNEL_ID);

  try {
    console.log('Member joined:', member.user.tag);

    const dmChannel = await member.createDM();
    console.log(`DM channel created with ${member.user.tag}`);

    await dmChannel.send('Please enter your password:');
    console.log(`Sent password prompt to ${member.user.tag}`);

    const filter = (msg) => {
      return msg.author.id === member.user.id;
    };

    const collector = dmChannel.createMessageCollector(filter, { time: 60000 });

    collector.on('collect', (msg) => {
      console.log(`Collected message: ${msg.content}`);

      const password = msg.content.trim();
      const roleID = passwordRoles[password];

      if (roleID) {
        console.log(`Correct password entered by ${member.user.tag}`);
        collector.stop();
        // member.send('You have entered the correct password. You can now join the server.');
        member.send('正しいパスワードが入力されました. サーバーに接続されます.');

        const guild = member.guild;
        const role = guild.roles.cache.get(roleID);
        if (role) {
          member.roles.add(role)
            .then(() => {
              console.log(`Role added to ${member.user.tag}`);
              if (channel.isText) {
                const embed = new MessageEmbed()
                  .setTitle('Role Added')
                  .setDescription(`Role added to ${member.user.tag}`)
                  .setColor('#00ff00');
                channel.send(embed);
              } else {
                console.error('Specified channel not found.');
              }
            })
            .catch((error) => {
              console.error(`Failed to add role to ${member.user.tag}:`, error);
            });
        } else {
          console.error('Specified role not found.');
        }
      } else {
        console.log(`Incorrect password entered by ${member.user.tag}`);
        // member.send('The password is incorrect. Please try again.');
        member.send('パスワードが正しくありません. もう一度やり直してください.');
      }

      collector.on('end', (collected, reason) => {
        if (reason === 'time') {
          console.log(`Password input time expired for ${member.user.tag}`);
          // member.send('The password input time has expired. Please try to join again.');
          member.send('タイムアウトしました. 再度参加しなおしてください.');
        }
      });
    });
  } catch (error) {
    console.error('Failed to create DM channel:', error);
  }
};

module.exports = assignRole;