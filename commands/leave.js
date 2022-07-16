const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Thoát kênh voice chat"),
  async execute(interaction) {
    const memberVoice = interaction.member.voice;
    if (!memberVoice.channel) {
      await interaction.reply("Chưa vào kênh voice chat!");
      return;
    }

    const connection = getVoiceConnection(memberVoice.channel.guildId);
    if (connection) {
      await interaction.reply("Bye bye");
      connection.destroy();
      return;
    }

    await interaction.reply("Hiện Kurumi không ở trong voice chat");
  },
};
