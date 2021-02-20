const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "ban",
    description: `Ban members.`,
    permissions: ["BAN_MEMBERS", "ADMINISTRATOR"],
    cooldown: 30000,
    run: async (bot, message) => {
        let args = message.content.split(/ +/g);
        let targets = message.checkMember("", 1);

        if (targets != false) {

            let target = targets[0];

            let guildTargetObj = message.guild.members.cache.get(target);

            userID_index = (args.indexOf(target));
            args[userID_index] = '';
            args = args.slice(1).filter(a => a != '');

            reason = (args.join(" "))

            if (guildTargetObj) {

                // This user is in the server, let's make sure they aren't staff
                if (guildTargetObj.isStaff && guildTargetObj.id != message.member.id) {
                    message.channel.send(new MessageEmbed()
                        .setDescription(`You cannot ban a staff member.`)
                        .setColor(0xFF0000)
                    );
                } else {
                    if (guildTargetObj.id == message.member.id) {
                        message.channel.send(new MessageEmbed()
                            .setDescription(`You cannot ban yourself. :neutral_face:`)
                            .setColor(0xFF0000)
                        );
                    } else {
                    };
                }

            } else {
                // User isn't in the server, so we'll ban them
            }
        } else {
            message.channel.send("no mention");
        }
    }
}