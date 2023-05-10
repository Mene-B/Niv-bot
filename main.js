const Discord = require("discord.js");
const client = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessageTyping
]})
const config = require("./config.json");
const fs = require("fs");

client.login(config.token)
client.on("ready" , ()=>{
    console.log("The bot is ready to work");
    client.guilds.cache.get(config.guildId).channels.cache.get("1105915988920254497").send("Ready to work");
})
client.on("guildMemberAdd", member => {
    member.guild.channels.cache.get(config.welcomeChannelId).send(`Welcome to ${member.nickname || member.user.username}`)
})