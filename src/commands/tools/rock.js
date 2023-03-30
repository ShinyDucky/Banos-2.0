const { SlashCommandBuilder } = require("discord.js");
const { rock } = require("../../api/data.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rockroulette")
        .setDescription("THE ROCK")
        .addSubcommand(public =>
            public.setName("public")
                .setDescription("Sends to everyone"))
        .addSubcommand(incognito =>
            incognito.setName("incognito")
                .setDescription("Sends to you and just you")),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "public":
                const publicimage = rock[Math.floor(Math.random() * rock.length)];

                await interaction.reply({ content: publicimage })
                break;
            case "incognito":
                const privateimage = rock[Math.floor(Math.random() * rock.length)];

                await interaction.reply({ content: privateimage, ephemeral: true })
        }
    }

}