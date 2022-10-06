const mySecret = process.env['TOKEN']
const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Yo boi!!'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);



const DGH_BOT = require("./structures/Client");
const Discord = require("discord.js");
const client = new DGH_BOT();
client.start();
require("./structures/antiCrash")(client);
require("./handlers/handler")(client);
require("./handlers/interaction")(client);
