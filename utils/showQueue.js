const { QueueRepeatMode } = require('discord-player');

module.exports = {
  showQueue: (queue) => {
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag}`;
    });

    let repeatMode;
    switch(queue.repeatMode) {
      case QueueRepeatMode.OFF:
        repeatMode = "Tắt"
        break;
      case QueueRepeatMode.TRACK:
        repeatMode = "🔂 Một"
        break;
      case QueueRepeatMode.QUEUE:
        repeatMode = "🔁 Tất cả"
        break;
      case QueueRepeatMode.AUTOPLAY:
        repeatMode = "▶ Tự động phát"
        break;
      default:
        repeatMode = "Không rõ"
    }
    

    queue.metadata.channel.send({
      embeds: [
        {
          title: "Đang phát",
          description: `${tracks.join("\n")}${queue.tracks.length > tracks.length
              ? `\n... thêm ${`${queue.tracks.length - tracks.length} bài nữa`}`
              : ""}`,
          color: "RANDOM",
          fields: [
            {
              name: "Đang phát",
              value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
              inline: true,
            },
            {
              name: "Lặp", 
              value: repeatMode,
              inline: true,
            }
          ],
        },
      ],
    });
  }
}
