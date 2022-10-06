const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dm",
  category: "moderation",
  description: "dm a user from the server.",
  usage: "dm <@user> <message>",
  P_user: ["MANAGE_GUILD"],
  P_bot: ["MANAGE_GUILD"],
  args: true,
  run: async (client, message, args) => {
    try {
    let member = message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    let text = args.slice(1).join(' ');

    let embed = new MessageEmbed()
    .setAuthor("Astra Messaging System", message.guild.iconURL())
    .setColor("GREEN")
    .setDescription(`Message From ${message.author}`)
    .addField("Message:", text)
    .setFooter("Astra Development")

    member.send({embeds: [embed]})
    } catch {
      
    }
  }
}