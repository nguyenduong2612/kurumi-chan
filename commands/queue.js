const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");
const { showQueue } = require("../utils/showQueue");

module.exports = {
  data: new SlashCommandBuilder().setName("queue").setDescription("Hiển thị danh sách nhạc"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue) {
      await interaction.reply({ content: "Không có danh sách nhạc" });
      return;
    }

    await interaction.reply({ content: "✅ | Đã hiển thị danh sách đang phát" });
    showQueue(queue);
  },
};
