const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Xóa nhạc ra khỏi danh sách")
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("Số thứ tụ trong danh sách")
        .setRequired(true)
    ),
  async execute(interaction) {
    const memberVoice = interaction.member.voice;
    if (!memberVoice.channel) {
      await interaction.reply("Chưa vào kênh voice chat!");
      return;
    }

    const input = interaction.options.getNumber("number");

    const queue = player.getQueue(interaction.guildId)
    if (!queue) {
      await interaction.reply({ content: "Không có danh sách nhạc" });
      return;
    }

    const trackIndex = input - 1;
    if (!queue.tracks[trackIndex]) {
      await interaction.reply({ content: `❌ | Không tìm thấy bài hát trong danh sách` });
      return;
    }

    const trackName = queue.tracks[trackIndex].title;
    queue.remove(trackIndex);

    await interaction.reply({ content: `✅ | Đã xóa **${input}. ${trackName}**.` });
  },
};
