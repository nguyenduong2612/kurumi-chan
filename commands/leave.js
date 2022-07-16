const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Thoát kênh voice chat"),
  async execute(interaction) {
    const memberVoice = interaction.member.voice;
    if (!memberVoice.channel) {
      await interaction.reply("Please join a voice channel first");
      return;
    }

    const connection = getVoiceConnection(memberVoice.channel.guildId);
    if (connection) {
      await interaction.reply("Bye bye");
      connection.destroy();
      return;
    }

    await interaction.reply("I am not joining any channel");
  },
};
