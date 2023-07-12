const { roles } = require('./config.js');

// ボットに対するロールの付与
const addBotRole = async (message, roleID) => {
  if (!message.member) {
    const member = await message.guild.members.fetch(message.author.id);
    message.member = member;
  }
  
  const role = message.guild.roles.cache.get(roleID);
  if (role) {
    message.member.roles.add(role)
      .then(() => {
        console.log(`Role added to bot: ${role.name}`);
      })
      .catch((error) => {
        console.error('Failed to add role to bot:', error);
      });
  } else {
    console.error('Specified bot role not found.');
  }
};

// ロールの付与
const addRole = (message, roleName) => {
  const roleID = roles[roleName];
  if (roleID) {
    const role = message.guild.roles.cache.get(roleID);
    if (role) {
      message.member.roles.add(role)
        .then(() => {
          console.log(`Role added to ${message.author.tag}: ${role.name}`);
          message.channel.send(`Role added: ${role.name}`);
        })
        .catch((error) => {
          console.error(`Failed to add role to ${message.author.tag}:`, error);
          message.channel.send('Failed to add role.');
        });
    } else {
      console.error('Specified role not found.');
      message.channel.send('Specified role not found.');
    }
  } else {
    console.error('Specified role not found.');
    message.channel.send('Specified role not found.');
  }
};

module.exports = {
  addBotRole,
  addRole
};
