const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder().setName("stop").setDescription("Xóa danh sách và tắt nhạc"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue)
      return interaction.reply({
        content: "Không có danh sách nhạc",
      });

    queue.destroy();

    await interaction.reply({ content: "⏹ | Đã tắt" })
  },
};
