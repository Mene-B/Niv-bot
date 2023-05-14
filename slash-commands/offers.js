const {SlashCommandBuilder,EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const offers = require("../offersInfo.js")

module.exports = {
    data : new SlashCommandBuilder()
    .setName("offers")
    .setDescription("Sends the offer that you want to see")
    .addIntegerOption(option=> {
        return option 
        .setName("number")
        .setDescription("Choose the number of the offer that you want")
        .addChoices(
            {name : "1", value : 1},
            {name : "2", value : 2},
            {name : "3", value : 3},
            {name : "4", value : 4},
            {name : "5", value : 5},
            {name : "6", value : 6},
            {name : "7", value : 7},
        )
        .setRequired(true)
    }),
    run : async (interaction)=> {
        const index = interaction.options.getInteger("number")-1;
        const title = offers.offers[index].name;
        const content = offers.offers[index].description;

        const embed = new EmbedBuilder()
        .setAuthor({name : title})
        .setDescription(content)
        .setColor("Blurple")

        const button = new ButtonBuilder()
        .setCustomId("plans")
        .setLabel("See our plans")
        .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
        .addComponents([button])

        const message = await interaction.reply({embeds : [embed], components : [row]});

        const collector = message.createMessageComponentCollector({
            filter : ()=> true,
            time : 60000
        })

        collector.on("collect", newInteraction=>{
            if (newInteraction.member !== interaction.member){
                return (`${newInteraction.member.nickname || newInteraction.member.user.username} can't click on this button`)
            }
            const embedPlans = new EmbedBuilder()
            .setAuthor({
                name : "Our plans"
            })
            .setDescription("Here are our plans !")
            .setColor("DarkGold")

            newInteraction.message.components[0].components[0].data.disabled = true;
            newInteraction.message.edit({components : newInteraction.message.components})

            return newInteraction.reply({embeds : [embedPlans]})
        })
    }
}