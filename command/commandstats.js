const Discord = require('discord.js')
module.exports = {
    name: "commandstats",
    description: `commandstats.`,
    permissions: ["DEVELOPER"],
    run: async (bot, message) => {
        const args = message.content.split(/ +/g).slice(1);

        const { getCommandStat, getCommandGlobalStat } = require('../db');

        if (args.length) {
            let command = args[0];

            if (command != "global") {
                let stats = await getCommandStat(command);

                let hourPrior = Date.now() - 1000 * 60 * 60 * 24;

                let past24HourStat = stats.filter((stat) => parseInt(stat.timestamp) >= parseInt(hourPrior))

                let commandStat = new Discord.MessageEmbed()
                    .setDescription(`${command} has been used **${past24HourStat.length}** times in the past 24.0 hours`)
                    .setColor(0x00afb9)

                message.channel.send(commandStat)
            } else {
                let stats = await getCommandGlobalStat();

                let statsToSort = [...new Set(stats.map((stat) => stat.command))]

                let commandStat = new Discord.MessageEmbed()
                    .setTitle(`Lifetime command stats`)
                    .setDescription(`${statsToSort.slice(0, 15).sort((a, b) => getTimes(b) - getTimes(a)).map((sort, i) => `${i + 1}. **${sort}** (${getTimes(sort)} times)`).join('\n')}`)
                    .setColor(0x00afb9)

                message.channel.send(commandStat)

                function getTimes(time) {
                    return stats.filter(stat => stat.command == time).length;
                }
            }
        }
    }
}