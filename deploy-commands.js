const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('clicker')
    .setDescription('Comença el clicker!')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands('CLIENT_ID_AQUI'),
      { body: commands }
    );

    console.log('Comanda registrada!');
  } catch (error) {
    console.error(error);
  }
})();
