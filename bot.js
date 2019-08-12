const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  var badword = RegExp(/fuck/);
  console.log('I am ready!');
});

client.on('message', message => {
  if (!message.guild) return;
  
  var str = message.content;

  if(str.match(badword)){
    message.reply(`has been kicked! Reason: Saying bad words`);
	message.delete(20000);
	message.member.kick('Saying bad words!');
  };

  if (message.content.startsWith('!ban')) {
    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to ban the member');
          console.error(err);
        });

      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }

    } else {
    //No user was mentioned
      message.reply('You didn\'t mention the user to ban!');
    }
  }
  if (message.content.startsWith('!kick')) {
    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to kick the member');
          console.error(err);
        });

      } else {
        message.reply('That user isn\'t in this guild!');
      }

    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});


client.login('My token');