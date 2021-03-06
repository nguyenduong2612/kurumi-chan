// Require the necessary discord.js classes
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents } = require("discord.js");
const { clientId, token } = process.env;
const { registerSlashCommands } = require("./deploy-commands");

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
module.exports = client;

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  if (command.data) client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once("ready", async () => {
  try {
    await registerSlashCommands(clientId);
  } catch (err) {
    console.error(`Could not register commands for a server!, ${err.message}`);
  }
  console.log("Kurumi is ready!");
  client.user.setActivity("with umih4ra", { type: "PLAYING" });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Có lỗi khi thực hiện lệnh!",
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(token);
