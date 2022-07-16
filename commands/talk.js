const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  AudioPlayer,
  createAudioResource,
  StreamType,
  entersState,
  VoiceConnectionStatus,
  getVoiceConnection,
  joinVoiceChannel,
} = require("@discordjs/voice");
const tts = require("discord-tts");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("talk")
    .setDescription("Chuyển văn bản thành giọng nói")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Kurumi sẽ nói hộ lòng bạn")
        .setRequired(true)
    ),
  async execute(interaction) {
    const memberVoice = interaction.member.voice;
    if (!memberVoice.channel) {
      await interaction.reply("Please join a voice channel first");
      return;
    }

    const input = interaction.options.getString("input");

    let audioPlayer = new AudioPlayer();
    const stream = tts.getVoiceStream(input, { lang: "vi" });
    const audioResource = createAudioResource(stream, {
      inputType: StreamType.Arbitrary,
      inlineVolume: true,
    });

    const getPlayingInstance = getVoiceConnection(memberVoice.channel.guildId);
    if (getPlayingInstance) {
      await interaction.reply({
        content: "Không thể thực hiện vào lúc này! Gõ **/leave** để chuyển sang TTS mode",
        ephemeral: true,
      });
      return;
    }

    const voiceConnection = joinVoiceChannel({
      channelId: memberVoice.channelId,
      guildId: memberVoice.channel.guildId,
      adapterCreator: memberVoice.channel.guild.voiceAdapterCreator,
    });

    if (voiceConnection.status === VoiceConnectionStatus.Connected) {
      voiceConnection.subscribe(audioPlayer);
      audioPlayer.play(audioResource);
      const interval = setInterval(() => {
        if (!audioPlayer.checkPlayable() && voiceConnection) {
          voiceConnection.destroy();
          clearInterval(interval);
        }
      }, 1000);
    }

    await interaction.reply(`${interaction.user.username}: ${input}`);
  },
};
