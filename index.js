// -*- mode: js; js-indent-level: 4; -*-

async function run() {
    
// require stuff
const { Client, Intents, MessageAttachment, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const { key } = require('./config.json');
const https = require('https');
const fetch = require('node-fetch');
const {File} = await import ('fetch-blob/file.js');
const FormData = require('form-data');
const fs = require('fs');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
    //console.log(key);
});

async function sendPost(file,template,key) {
    console.log("FILE IS", file);

    const body = new FormData();
    body.append('images', file, 'file.jpg');
    //console.log("body will be", {body: body._blob()});
    var options = {
	method: 'POST',
	headers: {
	    // 'Content-Type': 'multipart/form-data',
	    'Authorization': key,
	    //'Content-Length': data.length
	},
	body
    };

    // Set up the request
    const host = "https://api.makesweet.com"
    const text = "froggy"
    const req = await fetch(host + `/make/${template}?text=${text}`, options);
    //`https://api.makesweet.com/make/${template}?text=froggy`,
    return req;
}

const fileTest = fs.readFileSync('frog.jpg'); //, {encoding:'utf8'});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

 // const result = await YOUR_FUNCTION();
   // await interaction.editReply(result);
    const { commandName } = interaction;

    if (commandName === 'ping') {
	await interaction.reply('Pong!');
    } else if (commandName === 'heart-locket') {
	await interaction.reply('Working on it');
	const img = await sendPost(fileTest,'heart-locket',key);
	console.log(img.status);
	if (img.status === 200) {
	    //const imgArray = await img.arrayBuffer();
	    //console.log({imgArray});
	    const file = new MessageAttachment(img.body, 'animation2.gif');
	    const gif = {
		color: 0x006400,
		title: 'gif',
		image: {
		    url: 'attachment://animation2.gif',
		},
	    };
	    await interaction.editReply({ embeds: [gif], files: [file] });
	} else {
	    const error = (await img.json()).error
	    const gif = {
		color: 0xff0000,
		title: 'Error',
		description: `Error ${error} occured`,
	    };
	    await interaction.editReply({ embeds: [gif] });
	}
	    
	} else if (commandName === 'user') {
	    await interaction.reply('User info.');
	}
});

// Login to Discord with your client's token
client.login(token);

}

run().catch(e => console.error(e));
