const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");
const { unlockedChannels, readMessageId } = require("../../api/data")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlock")
        .setDescription("Unlocks a previously locked channel | Requires Manage Channels Permission")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("The channel to unlock")
                .addChannelTypes(ChannelType.GuildText)),

    async execute(interaction) {
        const { channel, options, guild } = interaction;
        const lockedChannel = options.getChannel("channel") || channel;
        unlockedChannels(lockedChannel.id)

        let embed = new EmbedBuilder()
            .setTitle("Channel Unlocked")
            .setDescription("<#" + lockedChannel + "> is now unlocked. BE GOOD!!!");
        lockedChannel.send({ embeds: [embed] })
        let message = "<#" + lockedChannel + "> has been unlocked"
        interaction.reply({ content: message, ephemeral: true })
    }
}