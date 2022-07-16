const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder().setName("resume").setDescription("Tiếp tục phát nhạc"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    queue.setPaused(false);

    await interaction.deferReply();
    await interaction.deleteReply();
  },
};
