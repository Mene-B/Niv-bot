const {SlashCommandBuilder,EmbedBuilder} = require("discord.js")

module.exports = {
    data : new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Send an embed message as an administrator")
        .addStringOption(option =>{
            return option
            .setName('title')
            .setDescription('Enter the title of the embed here')
            .setRequired(true)
        })
        .addStringOption(option => {
            return option
            .setName('content')
            .setDescription('Enter the content of the embed here')
            .setRequired(true)
        })
        .addStringOption(option => {
            return option 
            .setName("color")
            .setDescription('Choose the color pf your embed')
            .setRequired(true)
            .addChoices(
                {name : "Aqua", value : "Aqua"},
                {name : "Blue", value : "Blue"},
                {name : "Blurple", value : "Blurple"},
                {name : "DarkAqua", value : "DarkAqua"},
                {name : "DarkBlue", value : "DarkBlue"},
                {name : "DarkButNotBlack", value : "DarkButNotBlack"},
                {name : "DarkGold", value : "DarkGold"},
                {name : "DarkGreen", value : "DarkGreen"},
                {name : "DarkGrey", value : "DarkGrey"},
                {name : "DarkNavy", value : "DarkNavy"},
                {name : "DarkOrange", value : "DarkOrange"},
                {name : "DarkPurple", value : "DarkPurple"},
                {name : "DarkRed", value : "DarkRed"},
                {name : "DarkVividPink", value : "DarkVividPink"},
                {name : "DarkerGrey", value : "DarkerGrey"},
                {name : "Fuchsia", value : "Fuchsia"},
                {name : "Gold", value : "Gold"},
                {name : "Grey", value : "Grey"},
                {name : "Greyple", value : "Greyple"},
                {name : "LightGrey", value : "LightGrey"},
                {name : "LuminousVividPink", value : "LuminousVividPink"},
                {name : "Navy", value : "Navy"},
                {name : "Orange", value :"Orange"},
                {name : "Red", value : "Red"},
                {name : "White", value : "White"}
            )
        }),
    run : (interaction)=>{
        if (!interaction.member.roles.cache.has("1107433014813790321")){
            return interaction.reply("Only administrators can use this command")
        }
        const title = interaction.options.getString("title");
        const content = interaction.options.getString("content");
        const color = interaction.options.getString("color");

        const embed = new EmbedBuilder()
        .setAuthor({
            name : title
        })
        .setDescription(content)
        .setColor(color);

        return interaction.reply({embeds : [embed]});
    }
}