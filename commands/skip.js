const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Chuyển bài tiếp theo"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue?.playing) {
      await interaction.reply({ content: "Không có nhạc đang phát" });
      return;
    }

    queue.skip();
    // queue.setPaused(false);

    await interaction.reply({ content: "⏩ | Đã chuyển bài" })
  },
};
