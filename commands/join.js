const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Vào kênh voice chat"),
  async execute(interaction) {
    const memberVoice = interaction.member.voice;
    if (!memberVoice.channel) {
      await interaction.reply("Chưa vào kênh voice chat!");
      return;
    }

    joinVoiceChannel({
      channelId: memberVoice.channelId,
      guildId: memberVoice.channel.guildId,
      adapterCreator: memberVoice.channel.guild.voiceAdapterCreator,
    });

    await interaction.reply("Đã vào voice chat");
  },
};
