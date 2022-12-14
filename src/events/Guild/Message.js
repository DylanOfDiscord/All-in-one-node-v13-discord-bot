let cooldown = {};
const Discord = require("discord.js")
const usersMap = new Map();
const LIMIT = 7;
const DIFF = 5000;
module.exports = client => {

  client.on("messageCreate", async message => {
    //require("../../structures/MessageScript/Message.js");
    if (message.author.bot || !message.guild || message.webhookID) return;
    const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

    if(!message.guild.me.permissions.has('ADMINISTRATOR')) {
      if(!message.channel.id === "1008835025543888976") return;
      if(!message.channel.id === "1008835096012398673") return;
      if(!message.channel.id === "1008835061078048888") return;
      
      if (regex.exec(message.content)) {
        message.delete()
        let embed = new Discord.MessageEmbed()
        .setTitle("Message Deleted")
        .setColor("RED")
        .setDescription('Your message included a invite so it was deleted.')
        .setFooter("Astra Auto-Moderation")
        message.channel.send({embeds: [embed]})
      }
    }
    let Spamembed = new Discord.MessageEmbed()
        .setTitle("Message Deleted")
        .setColor("RED")
        .setDescription('Your message has been deleted for spamming.')
        .setFooter("Astra Auto-Moderation")
    
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, 30000);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {

               message.reply({embeds: [Spamembed]});
              message.channel.bulkDelete(LIMIT);
               
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, 30000);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
    
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = client.config.bot.prefix;
    const escapeRegex = str =>
      str.replace(/[.<>`??????????????????????????*@_+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(Prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    if (message.content == `<@${client.user.id}>`) {
      return client.send(
        `Hey, I'm DGH BOT.\nMy current prefix is \`${Prefix}\``,
        { message, timeout: 20000 }
      );
    }
    const args = message.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/);
    let cmd = args.shift().toLowerCase();
    let command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) {
      let cmdx = await client.data.get(`cmd_${message.guild.id}`);
      if (cmdx) {
        let cmdy = cmdx.find(x => x.name === cmd);
        if (!cmdy) return;
        if (cmdy.type === "embed")
          message.channel.send({
            embeds: [cmdy.responce]
          });
        if (cmdy.type === "content")
          message.channel.send({
            content: cmdy.responce
          });
      }
      return;
    }
    if (client.config.maintenance && client.config.bot.owners.includes(message.author.id) === false) {
      let ownerOnly = new client.Discord.MessageEmbed().setDescription(
        `*${await client.emoji(
          "DGH_error"
        )} Command is in progress, you can't use cmd Now*`
      );
      return client.send(null, { embed: [ownerOnly], message });
    }
    /* O W N E R */
    if (command.ownerOnly) {
      if (client.config.bot.owners.includes(message.author.id) === false) {
        let ownerOnly = new client.Discord.MessageEmbed().setDescription(
          `*${await client.emoji(
            "DGH_error"
          )} Only Bot Developer can use this command!*`
        );
        return client.send(null, { embed: [ownerOnly], message });
      }
    }
    /* A R G S */
    if (command.args && !args.length) {
      return message.channel.send({
        embeds: [
          new client.Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `You didn't provide any arguments, ${
                message.author
              }!\nThe proper usage would be: \n\`\`\`html\n${command.usage ||
                "No Usage"}\n\`\`\`Description:\`\`\`html\n${command.description ||
                "No Description"}\n\`\`\``
            )
        ]
      });
    }
    /* P E R M I S S I O N S */
    if (command.P_bot) {
      const Permissions = command.P_bot.filter(
        x => !message.guild.me.permissions.has(x)
      ).map(x => "`" + x + "`");
      if (Permissions.length)
        return client.send(
          `I need ${Permissions.join(
            ", "
          )} permission(s) to execute the command!`,
          { message }
        );
    }

    if (command.P_user) {
      const Permissions = command.P_user.filter(
        x => !message.member.permissions.has(x)
      ).map(x => "`" + x + "`");
      if (Permissions.length)
        return client.send(
          `You need ${Permissions.join(
            ", "
          )} permission(s) to execute this command!`,
          { message }
        );
    }

    /* C O O L - D O W N */
    let uCooldown = cooldown[message.author.id];
    if (!uCooldown) {
      cooldown[message.author.id] = {};
      uCooldown = cooldown[message.author.id];
    }

    let time = uCooldown[command.name] || 0;
    if (time && time > Date.now())
      return client.send(
        `You can again use this command in ${Math.ceil(
          (time - Date.now()) / 1000
        )} second(s)`,
        { message, timedel: time }
      );
    cooldown[message.author.id][command.name] = Date.now() + command.cooldown;
    if (command) {
      try {
        command
          .run(client, message, args)
          .then(
            console.log(
              `${message.author.username} have used command ${command.name}`
            )
          )
          .catch(e => {
            console.log(e);
            const errrr = new client.Discord.MessageEmbed()
              .setColor("RED")
              .setTimestamp()
              .setDescription(
                `Something went wrong executing that command\nError Message: \`\`\`\n${
                  e.message ? e.message : e
                }\n\`\`\``
              );
            return message.channel
              .send({ embeds: [errrr], ephemeral: true })
              .then(m => {
                setTimeout(() => m.delete(), 13000);
              })
              .catch(e => {
                null;
              });
          });
      } catch (error) {
        const errrr = new client.Discord.MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `Something went wrong executing that command\nError Message: \`${
              error.message ? error.message : error
            }\``
          );
        return message.channel
          .send({ embeds: [errrr], ephemeral: true })
          .then(m => {
            setTimeout(() => m.delete(), 13000);
          })
          .catch(e => {
            null;
          });
      }
    }
  });
};
