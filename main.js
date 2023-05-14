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
client.on("ready" , async()=>{
    console.log("The bot is ready to work");
    //client.guilds.cache.get(config.guildId).channels.cache.get("1105915988920254497").send("Ready to work");
    
})
client.on("guildMemberAdd", async member => {
    //member.guild.channels.cache.get(config.welcomeChannelId).send(`Welcome to ${member.nickname || member.user.username}`)

    const embed = new Discord.EmbedBuilder()
    .setAuthor({
        name : `Welcome ${member.user.username}!`
    })
    .setDescription(`Welcome to ${member.user.username}, we are so happy to have you in our team now !\nPlease click on the button below to get the roles of the server`)  //You can modify the welcome message in this line
    .setColor("Gold")

    const button = new Discord.ButtonBuilder()
    .setCustomId(member.user.id)
    .setLabel("Verify")
    .setStyle(Discord.ButtonStyle.Success)

    const row = new Discord.ActionRowBuilder()
    .addComponents([button])


    const message = await client.guilds.cache.get(config.guildId).channels.cache.get(config.welcomeChannelId).send({
        embeds : [embed],
        components :[row]
    })


    const collector = message.createMessageComponentCollector({
        filter : ()=> true,
        time : 60000
    })

    collector.on("collect", interaction =>{
        if (interaction.user.id !== interaction.customId){
            return interaction.reply(`${interaction.member.nickname || interaction.member.user.username} can't click on this button`)
        }
        interaction.reply(`${member.user.username} verified successfully ! You now have the roles of the server.`);
        interaction.message.components[0].components[0].data.disabled = true;
        interaction.message.edit({
            components : interaction.message.components
        });
        member.roles.add("1106311880231895170");  // you an replace this id with the id of the role that you want to add 
    })

})

const commandsFiles = fs.readdirSync("./slash-commands");
client.on("interactionCreate", (interaction) => {
    if (interaction.isCommand()){
        const command = commandsFiles.find(cmd => cmd === interaction.commandName + ".js");
        const cmd = require("./slash-commands/" + command);
        cmd.run(interaction);
    }
})