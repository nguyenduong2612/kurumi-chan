const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
const { QueryType } = require("discord-player");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Thêm nhạc")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Tên hoặc URL bài hát/playlist (Youtube/Soundcloud/Spotify)")
        .setRequired(true)
    ),
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

    const input = interaction.options.getString("title");

    const queue = player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel,
      },
      leaveOnEnd: false,
      leaveOnStop: false,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      return await interaction.reply({
        content: "Không vào được kênh voice chat!",
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const searchResult = await player.search(input, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    })

    if (!searchResult) return await interaction.reply({ content: `❌ | Không tìm thấy **${input}**` });

    if (searchResult.playlist) {
      queue.addTracks(searchResult.tracks)
      await interaction.followUp({ content: `✅ | Đã thêm playlist **${searchResult.playlist.title}**!` });
    } else {
      queue.addTrack(searchResult.tracks[0]);
      await interaction.followUp({ content: `✅ | Đã thêm **${searchResult.tracks[0].title}**!` });
    }

    if (!queue.playing) await queue.play();
  },
};
