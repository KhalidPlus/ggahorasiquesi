const Discord = require('discord.js');
const bot = require('./bot.js');
const client = new Discord.Client();
const ingamechat = new Discord.WebhookClient('732684871914487888', 'oQ77KSVLsMCwbHnq-UlH5eYaUkteuYfghWXCxi74qqSAn6sisCnPG3V0bJvIu6fLTAkS');

exports.sendMessage = function(text) {
	if (!text.match(/UnnamedGroup:\ \[[a-zA-Z0-9]{3,40}\]\ {0,}/g)) {

	}
	ingamechat.send(String(text));
}

var lastMessage = ''

client.on('message', msg => {
	if (msg.author.bot || msg.channel.name != 'ingame-chat') {
		// if sent by bot
		return;
	}


	if (msg.content.includes('§')) {
		ingamechat.send('This message contains restricted symbol (§)')
	} else if (msg.content.includes('\n')) {
		ingamechat.send('You can\'t send multi-line messages!')
	} else {
		if (msg.content.startsWith('!raw')) {
			if (msg.member.roles.cache.has('731327156453507074')) {
				bot.sendMessage(msg.content.slice(4).replace(/^\s+|\s+$/g, ''));
				lastMessage = msg.content;
			} else {
				ingamechat.send('You don\'t have enough perms to do that!');
			}
		} else if (msg.content.startsWith('!players')) {
			players = bot.getPlayers();
			console.log(typeof(players));
			playersStr = '';
			size = 0;
			keys = Object.keys(players);
			console.log(keys);
			console.log(players);
			for (i = 0; i < keys.length; i++) {
				size += 1;
				playersStr += players[keys[i]].username + ', ';
				// console.log(p);
				// console.log(p.username);
				// console.log(p.ping);
			}
			msg = 'There are ' + size + ' players online, list of them: ' + playersStr;
			ingamechat.send(msg.slice(0, msg.length - 3));

		} else {

			bot.sendMessage('[' + (msg.member.roles.cache.has('731327156453507074') ? 'MEMBER' : (msg.member.roles.cache.has('732573982909530113') ? 'COOL' : 'NON')) + '] ' + ' [' + msg.author.username + '] ' + msg.content);		
			lastMessage = msg.content;
		}
	}

});

client.login('NzMyNjgxNDY4MjE1ODIwMzQ5.Xw4Jvw.JskD45xytRaX7lDpSehZWaguOXA');
