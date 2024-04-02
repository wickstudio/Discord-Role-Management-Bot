const { 
    Client, 
    GatewayIntentBits, 
    REST, 
    Routes, 
    SlashCommandBuilder,
    EmbedBuilder, 
    ActionRowBuilder, 
    SelectMenuBuilder,
    PermissionsBitField 
} = require('discord.js');
const config = require('./config');

const commands = [
    new SlashCommandBuilder()
        .setName('role')
        .setDescription('لارسال لوحة التحكم الخاصة بالرتب!')
        .toJSON(),
];

const rest = new REST({ version: '9' }).setToken(config.token);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.once('ready', async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error refreshing commands:', error);
    }

    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Code by Wick Studio`);
    console.log(`discord.gg/wicks`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'role') {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({ content: 'ليس لديك الصلاحية لاستخدام هذا الامر.', ephemeral: true });
            return;
        }

        try {
            await interaction.reply({ content: 'Done', ephemeral: true });

            const embed = new EmbedBuilder()
                .setColor('#3F7FFA')
                .setThumbnail(config.thumbnail)
                .setTitle('قم بأختيار الرتب الخاصة بك')
                .setDescription('قم بأختيار الرتب التي تناسبك من قائمة الاختيارات تحت.')
                .setImage(config.image)
                .setFooter({ text: 'Wick Studio Team', iconURL: config.footer });

            const rows = [];

            Object.keys(config.roles).forEach((sectionKey, index) => {
                const section = config.roles[sectionKey];
                const options = section.roles.map(role => ({
                    label: role.label,
                    value: role.value,
                    description: role.label,
                }));

                const selectMenu = new SelectMenuBuilder()
                    .setCustomId(`select_${sectionKey}`)
                    .setPlaceholder(section.label)
                    .addOptions(options);

                rows.push(new ActionRowBuilder().addComponents(selectMenu));
            });

            await interaction.channel.send({ embeds: [embed], components: rows });
        } catch (error) {
            console.error('Error handling /role command:', error);
            await interaction.reply({ content: 'An error occurred while processing your command.', ephemeral: true });
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    const roleId = interaction.values[0];
    const role = interaction.guild.roles.cache.get(roleId);

    try {
        if (role) {
            if (interaction.member.roles.cache.has(roleId)) {
                await interaction.member.roles.remove(role);
                await interaction.reply({ content: `تم ازالة رتبة ${role.name} منك بنجاح`, ephemeral: true });
            } else {
                await interaction.member.roles.add(role);
                await interaction.reply({ content: `تم اعطائك رتبة ${role.name} بنجاح`, ephemeral: true });
            }
        } else {
            await interaction.reply({ content: 'لم يتم العثور على رتبة.', ephemeral: true });
        }
    } catch (error) {
        console.error('Error handling role selection:', error);
        if (!interaction.replied) {
            await interaction.reply({ content: 'There was an error updating your role. Please try again later.', ephemeral: true });
        } else {
            await interaction.followUp({ content: 'There was an error updating your role. Please try again later.', ephemeral: true });
        }
    }
});

client.login(config.token);


process.on('unhandledRejection', (reason, p) => {
    console.log(' [antiCrash] :: Unhandled Rejection/Catch');
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(' [antiCrash] :: Uncaught Exception/Catch');
    console.log(err, origin);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
    console.log(err, origin);
});