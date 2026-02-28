const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle,
  Events 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const users = {};

client.once(Events.ClientReady, () => {
  console.log(`Bot encès com ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'clicker') {

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('click_button')
            .setLabel('🎯 Fer clic')
            .setStyle(ButtonStyle.Primary),
        );

      await interaction.reply({
        content: "Clica el botó per començar!",
        components: [row]
      });
    }
  }

  if (interaction.isButton()) {

    const userId = interaction.user.id;

    if (!users[userId]) {
      users[userId] = {
        clicks: 0,
        xp: 0,
        coins: 0
      };
    }

    users[userId].clicks++;

    if (users[userId].clicks >= 100) {

      const role = interaction.guild.roles.cache.find(r => r.name === "Campió Clicker");

      if (role) {
        await interaction.member.roles.add(role);
      }

      users[userId].xp += 500;
      users[userId].coins += 200;
      users[userId].clicks = 0;

      await interaction.reply({
        content: "🎉 HAS GUANYAT! +500 XP +200 monedes i el rol Campió Clicker!",
        ephemeral: true
      });

    } else {

      await interaction.reply({
        content: `Clicks: ${users[userId].clicks}/100`,
        ephemeral: true
      });
    }
  }

});

client.login(process.env.TOKEN);
