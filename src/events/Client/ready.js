module.exports = async client => {
client.on("ready", async (reaction, user) => {
client.user.setActivity("Over Astra", {type: "WATCHING"})
})
}
