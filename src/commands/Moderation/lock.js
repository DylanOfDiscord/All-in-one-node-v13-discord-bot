const Discord = require("discord.js"),
  ms = require("ms");
module.exports = {
  name: "lock",
  aliases: ["Lock", "LoCk"],
  category: "moderation",
  description: "Locks the channel down",
  usage: "lock",
  args: false,
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    
    const role = message.guild.roles.cache.get("1008566039627452446")
    message.channel.permissionOverwrites.edit(role,{ 'SEND_MESSAGES': false })

    let embed = new Discord.MessageEmbed()
    .setTitle("Channel Locked")
    .setColor("GREEN")
    .setDescription("This channel has been locked.")

    message.channel.send({embeds: [embed]})
  }
}