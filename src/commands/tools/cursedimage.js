const { SlashCommandBuilder } = require("discord.js");
const { cursedimages } = require("../../../data.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cursedimage")
        .setDescription("Sends a cursed image")
        .addSubcommand(public =>
            public.setName("public")
                .setDescription("Sends to everyone"))
        .addSubcommand(incognito =>
            incognito.setName("incognito")
                .setDescription("Sends to you and just you")),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "public":
                const publicimage = cursedimages[Math.floor(Math.random() * cursedimages.length)];

                await interaction.reply({ content: publicimage })
                break;
            case "incognito":
                const privateimage = cursedimages[Math.floor(Math.random() * cursedimages.length)];

                await interaction.reply({ content: privateimage, ephemeral: true })
        }
    }
}