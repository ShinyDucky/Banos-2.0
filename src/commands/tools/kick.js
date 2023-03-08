const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a user with STYLE, Requires Kick Members Permissions")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("The person you would like to  with STYLE")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("The reason why you are kickning someone...")
        ),

    async execute(interaction, client) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "just felt like it lol (ERR: No reason provided)";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Turns out you are not worthy of the kick hammer\n(ERR: You cannot kick ${user.username} from this server due to role placements)`)
            .setColor(0xc723b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        const dmMessage = new EmbedBuilder()
            .setTitle("YOU HAVE BEEN kicked BY BANOS")
            .setImage("https://media.discordapp.net/attachments/761236786936414291/909985727310364672/kickos.png")
            .setDescription(`from ${interaction.guild.name}`);

        await member.send({ embeds: [dmMessage] })

        const response = new EmbedBuilder()
            .setTitle(`${user.username} is kicked`)
            .setDescription(`${user} is kicked for ${reason}`)

        await member.kick({ reason: reason }).catch(err => {
            interaction.reply({ content: "ERROR!!! :sob:" })
        });

        await interaction.reply({ embeds: [response] });
    }
}