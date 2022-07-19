const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require('discord-player');
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Chọn chế độ lặp lại")
    .addNumberOption((option) =>
      option
        .setName("mode")
        .setDescription("Lặp")
        .setRequired(true)
        .addChoices(
          { name: 'Tắt', value: QueueRepeatMode.OFF },
          { name: 'Một', value: QueueRepeatMode.TRACK },
          { name: 'Tất cả', value: QueueRepeatMode.QUEUE },
          { name: 'Tự động phát', value: QueueRepeatMode.AUTOPLAY },
        )
    ),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue?.playing) {
      await interaction.reply({ content: "Không có nhạc đang phát" });
      return;
    }

    const loopMode = interaction.options.getNumber("mode");

    const success = queue.setRepeatMode(loopMode);
    const loopModeIcon = loopMode === QueueRepeatMode.OFF ? '' : QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';

    await interaction.reply({ content: success ? `${loopModeIcon} | Đã thay đổi chế độ lặp` : '❌ | Không thể thay đổi chế độ lặp!' })
  },
};
