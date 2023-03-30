const { ActivityType } = require("discord.js");

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setPresence({
			process: process.pid,
			status: 'idle'
		});
		client.user.setActivity('p.OS try to overtake me in superiority.', { type: ActivityType.Watching/*, url: 'https://www.twitch.tv/shinyduck21'*/ });
		console.log(`Ready!!! ${client.user.tag} is logged in and online.`);

		let clientguilds = client.guilds.cache;
		console.log(clientguilds.map(g => g.id) || "None")
	}, // 909944891893755954
};
