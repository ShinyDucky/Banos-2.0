const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("This is just a test command thing"),
    
    async execute(interaction) {
        const { channel } = interaction;

        const embed = new EmbedBuilder()
            .setDescription("COOL");
        
        await interaction.reply({ embeds: [embed] })
    }
}