const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const client = new discord.Client();

//const to add by baekdavid 12.06.2020
const welcomeChannelName = "lobby";
const byeChannelName = "fin";
const welcomeChannelComment = "bonjour";
const byeChannelComment = "bye bye";


client.login(botConfig.token);

client.on('ready', async () => {
    console.log(" assistant-pronote is online.");
    client.user.setActivity("Prefix '!'", {type: "alors?"});
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    
    var prefix = botConfig.prefix;
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    
    if(message.content == 'big monkey') {
            return message.reply('little monkey');
    }
});

//clients added by baekdavid 12.06.2020
client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    const newUser = member.user;
    const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);
  
    welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
  
    member.addRole(guild.roles.find(role => role.name == "éléve"));
  });
  
  
  client.on("guildMemberRemove", (member) => {
    const guild = member.guild;
    const deleteUser = member.user;
    const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);
  
    byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
  });
  
  
  client.on("messageUpdate", (message) => {
    MessageSave(message, true)
  });
  
  client.on('message', async (message) => {
    MessageSave(message)
    if(message.author.bot) return;
  
    if(message.content == 'ping') {
      return message.reply('pong');
    }
  
    // if(message.content == '!si') {
    //   let embed = new Discord.RichEmbed()
    //   let img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
    //   var duration = moment.duration(client.uptime).format(" jour, hr, min, sec");
    //   embed.setColor('#186de6')
    //   embed.setAuthor('server info of assistant-pronote', img)
    //   embed.setFooter(`florence ❤️`)
    //   embed.addBlankField()
    //   embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    //   embed.addField('running time', `${duration}`, true);
    //   embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    //   embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
      
    //   // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    //   embed.addField('Discord.js',   `v${Discord.version}`, true);
    //   embed.addField('Node',         `${process.version}`, true);
      
    //   let arr = client.guilds.array();
    //   let list = '';
    //   list = `\`\`\`css\n`;
      
    //   for(let i=0;i<arr.length;i++) {
    //     // list += `${arr[i].name} - ${arr[i].id}\n`
    //     list += `${arr[i].name}\n`
    //   }
    //   list += `\`\`\`\n`
    //   embed.addField('list:',        `${list}`);
  
    //   embed.setTimestamp()
    //   message.channel.send(embed);
    // }
  
    if(message.content == 'embed') {
      let img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
      let embed = new Discord.RichEmbed()
        .setTitle('Titre')
        .setURL('baek.david@gmail.com')
        .setAuthor('David Baek')
        .setThumbnail(img)
        .addBlankField()
        .addField('Inline field title', 'Some value here')
        .addField('Inline field title', 'Some value here', true)
        .addField('Inline field title', 'Some value here', true)
        .addField('Inline field title', 'Some value here', true)
        .addField('Inline field title', 'Some value here1\nSome value here2\nSome value here3\n')
        .addBlankField()
        .setTimestamp()
        .setFooter('dbaek', img)
  
      message.channel.send(embed)
    } else if(message.content == '!help') {
      let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
      let commandList = [
        {name: '!help', desc: 'help'},
        {name: 'ping', desc: 'ping test'},
        {name: 'embed', desc: 'embed ex1'},
        {name: '!notice', desc: 'dm_notice'},
        {name: '!notice2', desc: 'dm_notice by embed form'},
        {name: '!supprimer', desc: 'clear text'},
        {name: '!invite', desc: 'invite to the channel'},
        {name: '!invite2', desc: 'invite to all channel'},
      ];
      let commandStr = '';
      let embed = new Discord.RichEmbed()
        .setAuthor('aide', helpImg)
        .setColor('#186de6')
        .setFooter(`assistant-pronote ❤️`)
        .setTimestamp()
      
      commandList.forEach(x => {
        commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
      });
  
      embed.addField('Commands: ', commandStr);
  
      message.channel.send(embed)
    } else if(message.content == '!invite2') {
      client.guilds.array().forEach(x => {
        x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0 for infini but null for 24 hours
          .then(invite => {
            message.channel.send(invite.url)
          })
          .catch((err) => {
            if(err.code == 50013) {
              message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** contacter Administrator')
            }
          })
      });
    } else if(message.content == '!invite') {
      if(message.channel.type == 'dm') {
        return message.reply('contacter Administrator.');
      }
      message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) 
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** contacter Administrator')
          }
        })
    } else if(message.content.startsWith('!notice2')) {
      if(checkPermission(message)) return
      if(message.member != null) { // notice from the channel
        let contents = message.content.slice('!notice2'.length);
        let embed = new Discord.RichEmbed()
          .setAuthor('notice')
          .setColor('#186de6')
          .setFooter(`assistant-pronote ❤️`)
          .setTimestamp()
    
        embed.addField('notice: ', contents);
    
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(embed)
        });
    
        return message.reply('notice envoyé');
      } else {
        return message.reply('go the channel');
      }
    } else if(message.content.startsWith('!notice')) {
      if(checkPermission(message)) return
      if(message.member != null) { 
        let contents = message.content.slice('!notice'.length);
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(`<@${message.author.id}> ${contents}`);
        });
    
        return message.reply('notice envoyé');
      } else {
        return message.reply('go to the channel');
      }
    } else if(message.content.startsWith('!supprimer')) {
      if(message.channel.type == 'dm') {
        return message.reply('c pas bien!');
      }
      
      if(message.channel.type != 'dm' && checkPermission(message)) return
  
      var clearLine = message.content.slice('!supprimer '.length);
      var isNum = !isNaN(clearLine)
  
      if(isNum && (clearLine <= 0 || 100 < clearLine)) {
        message.channel.send("numero entre 1 et 100?")
        return;
      } else if(!isNum) { 
        if(message.content.split('<@').length == 2) {
          if(isNaN(message.content.split(' ')[2])) return;
  
          var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
          var count = parseInt(message.content.split(' ')[2])+1;
          let _cnt = 0;
  
          message.channel.fetchMessages().then(collected => {
            collected.every(msg => {
              if(msg.author.id == user) {
                msg.delete();
                ++_cnt;
              }
              return !(_cnt == count);
            });
          });
        }
      } else {
        message.channel.bulkDelete(parseInt(clearLine)+1)
          .then(() => {
            AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "messages supprimés:");
          })
          .catch(console.error)
      }
    }
  });
  
  function checkPermission(message) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(`<@${message.author.id}> ` + "contacter Administrator.")
      return true;
    } else {
      return false;
    }
  }
  
  function changeCommandStringLength(str, limitLen = 8) {
    let tmp = str;
    limitLen -= tmp.length;
  
    for(let i=0;i<limitLen;i++) {
        tmp += ' ';
    }
  
    return tmp;
  }
  
  async function AutoMsgDelete(message, str, delay = 3000) {
    let msg = await message.channel.send(str);
  
    setTimeout(() => {
      msg.delete();
    }, delay);
  }
  
  function getEmbedFields(message, modify=false) {
    if(message.content == '' && message.embeds.length > 0) {
      let e = message.embeds[0].fields;
      let a = [];
  
      for(let i=0;i<e.length;i++) {
          a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`);
      }
  
      return a.join('');
    } else if(modify) {
      return message.author.lastMessage.content;
    } else {
      return message.content;
    }
  }
  
  function MessageSave(message, modify=false) {
    imgs = []
    if (message.attachments.array().length > 0) {
      message.attachments.array().forEach(x => {
        imgs.push(x.url+'\n')
      });
    }
  }