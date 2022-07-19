const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");
const { showQueue } = require("../utils/showQueue");

module.exports = {
  data: new SlashCommandBuilder().setName("shuffle").setDescription("Phát ngẫu nhiên"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue?.playing) {
      await interaction.reply({ content: "Không có nhạc đang phát" });
      return;
    }

    await queue.shuffle();

    await interaction.reply({ content: "🔀 | Đã bật phát ngẫu nhiên" })
    showQueue(queue);
  },
};
