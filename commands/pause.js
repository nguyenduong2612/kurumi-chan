const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder().setName("pause").setDescription("Dừng nhạc"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.followUp({
        content: "Không có nhạc đang phát",
      });

    queue.setPaused(true);

    await interaction.reply({ content: "Đã dừng" });
  },
};
