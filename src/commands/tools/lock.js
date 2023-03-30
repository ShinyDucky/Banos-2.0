const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { lockedChannel, setMessage } = require("../../api/data");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Locks a singular channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("THe Channel to Lock | Defaults to Current Channel")
                .addChannelTypes(ChannelType.GuildText)
        ).addStringOption(option =>
            option.setName("reason")
                .setDescription("The Reason why you are locking the Channel")
                .setAutocomplete(true)
        ),
    async execute(interaction) {
        const { channel, options, guild } = interaction;
        const lockChannel = options.getChannel("channel") || channel;
        const writeStatus = lockedChannel(lockChannel.id);

        if (!writeStatus) {
            interaction.reply({ content: "An error ocurred. *insert trombone wah wah wah", ephemeral: true })
        }

        const reason = options.getString("reason") || "Don't know just felt like it lol";
        const lockEmbed = new EmbedBuilder()
            .setTitle("Channel Locked")
            .setDescription(`${lockChannel} is now locked `)
            .addFields(
                { name: 'Reason', value: reason, inline: true },
            )

        await lockChannel.send({ embeds: [lockEmbed] }).then(sent => {
            let id = sent.id;
            setMessage(lockChannel.id, id)
        });
        await lockChannel.permissionOverwrites.edit(guild.roles.everyone, { SendMessages: false });

        await interaction.reply({ content: `Chanel ${lockChannel} is now locked`, ephemeral: true })
    }
}