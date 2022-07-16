const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder().setName("pause").setDescription("Dừng nhạc"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue?.playing) {
      await interaction.reply({ content: "Không có nhạc đang phát" })
      return;
    }

    queue.setPaused(true);

    await interaction.reply({ content: "⏸ | Đã dừng" });
  },
};
