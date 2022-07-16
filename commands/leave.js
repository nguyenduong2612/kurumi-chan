const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave channel"),
  async execute(interaction) {
    const memberVoice = interaction.member.voice;
    if (!memberVoice.channel) {
      await interaction.reply("Please join a voice channel first");
      return;
    }

    const connection = getVoiceConnection(memberVoice.channel.guildId);
    if (connection) {
      await interaction.reply("Left");
      connection.destroy();
      return;
    }

    await interaction.reply("I am not joining any channel");
  },
};
