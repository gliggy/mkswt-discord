const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const data = new SlashCommandBuilder()
	.setName('heart-locket')
	.setDescription('give picture, get gif')
	.addStringOption(option =>
		option.setName('url')
			.setDescription('the image\'s url')
			.setRequired(true));


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('heart-locket').setDescription('give picture, get gif').addStringOption(option => option.setName('image-url').setDescription("the image's url")),
	new SlashCommandBuilder().setName('about').setDescription('About this bot.'),
]
	.map(command => command.toJSON());


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
