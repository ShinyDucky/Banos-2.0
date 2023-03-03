const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("banos")
        .setDescription("cool banos stuff ig")
        .addSubcommand(info =>
            info.setName("info")
                .setDescription("Information about the bot")
        ).addSubcommand(credits =>
            credits.setName("credits")
                .setDescription("Credits for the bot")
        ).addSubcommand(sez =>
            sez.setName("sez")
                .setDescription("Make banos say something")
                .addStringOption(message =>
                    message.setName("message")
                        .setDescription("The message Banos sez")
                        .setRequired(true))),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "info":
                const infobed = new EmbedBuilder()
                    .setTitle("Bot Info")
                    .setDescription("This bot is made by <@743218702022869083>")
                    .addFields({ name: 'Version', value: '2.0.0', inline: true },
                        { name: 'Github URL', value: "https://github.com/ShinyDucky/Banos-2.0", inline: true });

                await interaction.reply({ embeds: [infobed], ephemeral: true })
                break;
            case "credits":
                const creditbed = new EmbedBuilder()
                    .setTitle("Bot Credits")
                    .setDescription("This bot is made by <@743218702022869083>. He is a photoshopped version of thanos I made in school.")
                    .addFields({ name: "Witnesses to his creation:", value: "<@750161305008078998>", inline: true });

                await interaction.reply({ embeds: [creditbed], ephemeral: true });
                break;
            case 'sez':
                const { options } = interaction;
                const message = options.getString("message");

                await interaction.reply({
                    content: message
                })
        }
    }
}