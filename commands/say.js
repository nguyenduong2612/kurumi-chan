const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say something")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply({
      content: "Done",
      ephemeral: true,
    }),
    await interaction.channel.send(interaction.options.getString("input"));
  },
};
