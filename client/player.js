const { showQueue } = require("../utils/showQueue");
const { Player } = require("discord-player");
const client = require("../index.js");

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

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
  showQueue(queue);
});

module.exports = player;
