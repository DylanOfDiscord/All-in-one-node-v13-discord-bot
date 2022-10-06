const discord = require("discord.js")
module.exports = {
  name: "uptime",
  description: "uptime of the bot",
  usage: "uptime",
  category: "utility",
  args: false,
  P_bot: ["MANAGE_WEBHOOKS"],
  run: async (client, message, args) => {
    const moment = require("moment");
require("moment-duration-format");
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    let embed = new discord.MessageEmbed()
    .setTitle("My Uptime")
    .setColor("GREEN")
    .setDescription(`${duration}`)

    message.channel.send({embeds: [embed]})
  }
}