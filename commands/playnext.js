const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
const { QueryType } = require("discord-player");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playnext")
    .setDescription("Thêm nhạc vào đầu danh sách (phát tiếp theo)")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Tên hoặc URL bài hát (Youtube/Soundcloud/Spotify)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const memberVoice = interaction.member.voice;
    if (!memberVoice.channel) {
      await interaction.reply("Chưa vào kênh voice chat!");
      return;
    }

    const input = interaction.options.getString("title");

    const queue = player.getQueue(interaction.guildId)
    if (!queue || !queue.playing) {
      await interaction.reply({ content: `⚠️ | Chưa có danh sách nhạc, dùng **/play** thay cho **/playnext**` });
      return;
    } 

    await interaction.deferReply();
    const searchResult = await player.search(input, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    })

    if (!searchResult) {
      await interaction.followUp({ content: `❌ | Không tìm thấy **${input}**` });
      return;
    } 

    if (searchResult.playlist) {
      await interaction.followUp({ content: `⚠️ | Không thể thêm playlist, dùng **/play** thay cho **/playnext**` });
    } else {
      queue.insert(searchResult.tracks[0]);
      await interaction.followUp({ content: `✅ | Đã thêm **${searchResult.tracks[0].title}** vào bài tiếp theo` });
    }
  },
};
