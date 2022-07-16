const { Player } = require("discord-player");
const client = require("../index.js");

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

const showQueue = (queue) => {
  const currentTrack = queue.current;
  const tracks = queue.tracks.slice(0, 10).map((m, i) => {
    return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag}`;
  });

  queue.metadata.channel.send({
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
  })
}

player.on("trackAdd", (queue, track) => {
  console.log(`${queue.guild.name}: ${track.title} has been added!`);
});

player.on("tracksAdd", (queue, tracks) => {
  console.log(
    `${queue.guild.name}: A playlist with ${tracks.length} songs has beed added!`
  );
});

player.on("trackStart", (queue, track) => {
  console.log(`${queue.guild.name}: ${track.title} has started playing`);
  showQueue(queue)
});

module.exports = player;
