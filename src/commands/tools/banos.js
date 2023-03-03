const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("banos")
        .addSubcommand(info =>
            info.setName("info")
                .setDescription("Information about the bot")
        ),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case "info":
                const infobed = new EmbedBuilder()
                    .setTitle("Bot Info")
                    .setDescription("This bot is made by <@743218702022869083>")
                    .addFields({ name: 'Version', value: '2.0.0', inline: true },);

                interaction.reply({ embeds: [infobed] })
                break;
        }
    }
}