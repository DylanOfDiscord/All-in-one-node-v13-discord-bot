const Discord = require("discord.js"),
  ms = require("ms");
module.exports = {
  name: "unlock",
  aliases: ["UNlock", "Unlock"],
  category: "moderation",
  description: "Unlock the channel down",
  usage: "unlock",
  args: false,
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
       
    const role = message.guild.roles.cache.get("1008566039627452446")
    message.channel.permissionOverwrites.edit(role,{ 'SEND_MESSAGES': true })

    let embed = new Discord.MessageEmbed()
    .setTitle("Channel Unlock")
    .setColor("GREEN")
    .setDescription("This channel has been unlocked.")

    message.channel.send({embeds: [embed]})
  }
}