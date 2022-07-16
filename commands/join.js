const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join channel"),
  async execute(interaction) {
    const memberVoice = interaction.member.voice;
    if (!memberVoice.channel) {
      await interaction.reply("Please join a voice channel first");
      return;
    }

    joinVoiceChannel({
      channelId: memberVoice.channelId,
      guildId: memberVoice.channel.guildId,
      adapterCreator: memberVoice.channel.guild.voiceAdapterCreator,
    });

    await interaction.reply("Joined");
  },
};
