let Discord = require("discord.js");

module.exports = {
  name: "test",
  ownerOnly: true,
  category: "owner",
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setAuthor("Application Menu", message.guild.iconURL())
    .setColor("GREEN")
    .setDescription(`Are you interested in becoming a moderator here at Astra? Well react with <:Ticket:1009909679972941827> emoji to apply. If you pass the application, you will be given a Trainee Moderator role which lasts for about 2 weeks but can be changed based on your activity before finishing your trial phase. As a moderator, you are expected to perform basic duties such as moderating the chat, reporting rulebreakers, giving tips and advice or assisting members with their needs. If you think you are fit with becoming a moderator on our server, be sure to read the requirements before filling out a staff form.\n\n**Requirements:**\n➥ Age of 13 or above\n➥ Have basic moderation knowledge & skills\n➥ Can be professional and mature while in public chat\n➥ Non-toxic attitude and can remain calm at all times\n➥ Must be level 5+ (use c!level to see your level)\n\n**Note:** If you have finished filling out an application, contact any management personnel or mod mail. We can review your application and decide whether you are suitable for joining the team.`)
    .setFooter("Astra Applications", message.guild.iconURL())

    message.channel.send({embeds: [embed]}).then(msg => {
      msg.react("<:Ticket:1009909679972941827>")
    })
  }
};