const { MessageEmbed } = require('discord.js');

module.exports = async (bot, message) => {
    // Let's handle commands

    // First, we'll ignore any DMs and log them to the console
    if (message.channel.type == 'dm') return console.log(`NEW PM: (${new Date().toUTCString()}) ${message.author.tag}: ${message.content}`);

    // Cancel if it doesn't start with our prefix
    if (!message.content.startsWith(process.env.PREFIX)) return;

    // Split the message and remove repeating spaces
    this.args = message.content.split(/ +/g);

    if (this.args) {
        this.command = this.args[0].toLowerCase().slice(1);
        this.cmd = bot["command"][this.command];
        if (this.cmd) {
            this.permHandler = require('../permissionHandler')(bot, message, this.cmd.name);

            const { checkCoolDown, addCommandStat } = require('../db');

            if (this.permHandler == true) {

                if (this.cmd.cooldown) {
                    let timer = await checkCoolDown(message.guild.id, message.member.id, this.cmd.name, this.cmd.cooldown);
                    if (timer != true && !message.member.developer) {
                        let timeRemaining = (((this.cmd.cooldown - timer[1]) / 1000).toFixed(1))
                        return message.channel.send(new MessageEmbed()
                            .setTitle(`On cooldown`)
                            .setDescription(`You are on cooldown! Please wait for **${timeRemaining}** seconds before trying again.`)
                            .setColor(0xFF0000)
                        );
                    }
                }

                this.cmd.run(bot, message);
                addCommandStat(Date.now(), this.cmd.name)
            } else {
                message.channel.send(new MessageEmbed()
                    .setTitle(`Missing Permissions`)
                    .setDescription(`You need one of these permission(s) to run this command **${this.permHandler.join(", ")}**.`)
                    .setColor(0xFF0000)
                );
            }
        }
    }
}