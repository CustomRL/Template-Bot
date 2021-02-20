const os = require('os');
module.exports = {
    name: "stats",
    description: `stats.`,
    run: async (bot, message) => {
        let freeMem = (`${bytesToSize(os.freemem())} / ${bytesToSize(os.totalmem())}`);
        let totalGuilds = bot.guilds.cache.size;
        let totalUsers = bot.users.cache.size;
        let uptime = moment.duration(bot.uptime).format("w [weeks] d [days], h [hours], m [minutes], s [seconds]")
        let statsEmbed = new MessageEmbed()
            .setThumbnail(bot.user.avatarURL() ? bot.user.avatarURL() : bot.user.defaultAvatarURL)
            .setTitle(`${bot.user.username} statistics`)
            .addField(`Memory`, freeMem, inline = true)
            .addField(`Total Guilds`, totalGuilds, inline = true)
            .addField(`Total Users`, totalUsers, inline = true)
            .addField(`Uptime`, uptime, inline = true)
            .setColor(0x4cc9f0)
            .setFooter(`Created At ${new Date(bot.user.createdAt).toUTCString()}`)
            .setTimestamp()
        message.channel.send(statsEmbed)
    }
}

function bytesToSize(bytes, decimals) {
    if (bytes === 0) return '0 Byte';
    const k = 1024;
    const dm = decimals || 3;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}


const moment = require('moment');
const momentDurationFormatSetup = require("moment-duration-format");
const { MessageEmbed } = require('discord.js');

momentDurationFormatSetup(moment);