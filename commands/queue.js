const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../client/player");

module.exports = {
  data: new SlashCommandBuilder().setName("queue").setDescription("Hiển thị danh sách nhạc"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue)
      return interaction.reply({
        content: "Không có danh sách nhạc",
      });

    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag}`;
    });

    return interaction.reply({
      embeds: [
        {
          title: "Danh sách nhạc",
          description: `${tracks.join("\n")}${
            queue.tracks.length > tracks.length
              ? `\n... thêm ${`${queue.tracks.length - tracks.length} bài nữa`}`
              : ""
          }`,
          color: "RANDOM",
          fields: [
            {
              name: "Đang phát",
              value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
            },
          ],
        },
      ],
    });
  },
};
