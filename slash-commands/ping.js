const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data : new SlashCommandBuilder()
        .setName("ping")
        .setDescription("sends back pong"),
    run : (interaction)=>{
        return interaction.reply("pong");
    }
}