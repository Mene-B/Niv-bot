const {SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const fs = require("fs");

module.exports = {
    data : new SlashCommandBuilder()
    .setName("commands")
    .setDescription('Gives all the slash commands of the server with their description'),
    run : async (interaction)=>{
        const commands = fs.readdirSync("./slash-commands").map(file =>{
            const fullFile = require("./"+file);
            return {name : fullFile.data.name, description : fullFile.data.description}
        })
        const embed = new EmbedBuilder()
        .setAuthor({name : "Slash commands"})
        .setColor("LuminousVividPink")
        commands.forEach(command => {
            embed.addFields({name : "/"+command.name,value : command.description, inline : true})
        })
        if (commands.length%3 !== 0){
            for (const i=0 ; i<3-commands.length%3; i++){
                embed.addFields({
                    name : "\u200B", value : "\u200B", inline : true
                })
            }
        }

        console.log(commands)
        interaction.reply({embeds : [embed]})
    }
}