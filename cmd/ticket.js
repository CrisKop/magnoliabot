exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
	let channel = message.channel;
	let ticket = message.guild.channels.cache.find(channel => channel.name == `ticket-${message.author.id}`);
	let author = message.author;
	let allow = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'];
	let deny = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'];
	try {
		let msg = await channel.send(
			embed('Tickets', 'React to this message to create a support ticket ' + message.author.tag)
		);

		await msg.react('📤');
		await msg.awaitReactions(async (reaction, user) => {
			if (user.id != message.author.id) return;

			if (reaction.emoji.name === '📤') {
				if (ticket) {
					channel.send(
						embed(
							'You already have an open ticket, if you think this is a mistake you can contact the Cornered Rat support team',
							`**Ticket ID** <#${ticket.id}>`
						)
					);
				} else {
					let ticketCreate = await message.guild.channels.create('ticket-' + author.id, {
						type: 'text',
						permissionOverWrites: [
							{
								id: message.guild,
								deny: ['VIEW_CHANNEL']
							},
							{
								id: author.id,
								allow: ['VIEW_CHANNEL'],
								deny: deny
							}
						],
						parent: '770285223296368642'
					});

					await ticketCreate.send(
						`Hi <@${author.id}>, our support team just received your ticket, please wait for them to respond to your request, thank you for your patience`
					);
					let channelLog = await message.guild.channels.cache.get('768970577058201622');

					let msgLogs = await channelLog.send('Ticket from' + author.tag, 'React to take de ticket');

					await msgLogs.react('✅');
					await msgLogs.awaitReactions(async (reaction, user) => {
						if (user.bot) return;

						if (reaction.emoji.name === '✅') {
							ticketCreate.createOverwrite(user.id, {
								SEND_MESSAGES: true,
								VIEW_CHANNEL: true,
								ATTACH_FILES: true,
								READ_MESSAGE_HISTORY: true
							});
							ticketCreate.createOverwrite(author.id, {
								SEND_MESSAGES: true,
								VIEW_CHANNEL: true,
								ATTACH_FILES: true,
								READ_MESSAGE_HISTORY: true
							});
							let staffClaim = [];
							staffClaim.push(user.tag);
							ticketCreate.send(
								`We have accepted your support request, you will be served by <@${user.id}>`
							);
							await msgLogs.edit(
								embed('Support Ticket from' + author.tag, 'Staff: ' + staffClaim.join(' | '))
							);
						}
					});

					msg.reactions.removeAll();
				}
			}
		});
	} catch (err) {
		console.error(err);
	}
};

function embed(title, description) {
  let Discord = require("discord.js")
	const embed = new Discord.MessageEmbed().setTitle(title).setDescription(description);
	return embed;
}