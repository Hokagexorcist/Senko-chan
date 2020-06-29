const Discord = require('discord.js');
const {Client, Attachment, MessageEmbed} = require('discord.js');
const client = new Client();

const prefix = '$'

const cheerio = require('cheerio');
const request = require('request')

client.once('ready', () => {
	console.log('You\'ve had a long day havent you? Come now, rest up and let me pamper you!');
	client.user.setActivity('Pamper Pamper V2.')
})

client.on('message', message => {
	if (!message.guild) return;

	if (message.content.startsWith(`${prefix}kick`)) {
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.member(user);
			if (member) {
				member
					.kick('Because no one likes you.')
					.then(() => {
						message.reply(`Successfully kicked ${user.tag}`);
					})
					.catch(err => {
						message.reply('Couldn\'t kick this user');
						console.error(err);
					});
			}
			else {
				message.reply('This does not belong to this server.');
			}
		}
		else {
			message.reply('You didn\'t mention a user to kick');
		}
	}
});

client.on('message', message => {

	if (!message.guild) return;
	if (message.content.startsWith(`${prefix}ban`)) {
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.member(user);
			if (member) {
				member
					.ban({
						reason: 'They broke the rules.',
					})
					.then(() => {
						message.reply(`Successfully banned ${user.tag}`);
					})
					.catch(err => {
						message.reply('Unable to ban this member.');
						console.error(err);
					});
			}
			else {
				message.reply('That user isn\'t in this discord.');
			}
		}
		else {
			message.reply('You didn\'t mention a user to ban.');
		}
	}
});

client.on('message', message => {
	if(message.content == `${prefix}ping!`) {
		message.channel.send('pong!');
	}
});

client.on('message', message =>{
	if (message.content === `${prefix}my avatar`) {
		message.reply(message.author.displayAvatarURL());
	}
});

client.on('message', message => {

    let args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        case 'senko-chan':
        image(message);
    }
})

function image(message){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "senko-chan",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });

};

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");
   
 
    switch (args[0]) {
        case 'help':
            const Embed = new Discord.MessageEmbed()
				.setTitle('I\'m here to answer all your pampering questions!')
                .setColor(0xFF0000)
                .setDescription('$kick, $ban, $senko-chan');

            message.author.send(Embed);
            break;
    }
 
 
});

client.login(process.env.BOT_TOKEN);
