const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "reload",
    description: `reload.`,
    permissions: ["DEVELOPER"],
    run: async (bot, message) => {
        const args = message.content.toLowerCase().split(/ +/g).slice(1);

        let category = args[0];
        let module = args[1];

        if (category) {
            if (module) {
                bot.unloadFile(category, module).catch(() => { })
                if (await bot.loadFile(category, module) != false) {
                    message.channel.send(new MessageEmbed()
                        .setTitle(`Reloaded Module`)
                        .setDescription(`Reloaded **${category}/${module}**.`)
                        .setColor(0x228b22)
                    );
                }

            } else {
                message.channel.send(new MessageEmbed()
                    .setTitle(`Missing Module`)
                    .setDescription(`You didn't provide a module, please provide a module: **${Object.keys(bot[category]).map(mod => mod.charAt(0).toUpperCase() + mod.slice(1)).join(", ")}**.`)
                    .setColor(0xFF0000)
                );
            }
        } else {
            message.channel.send(new MessageEmbed()
                .setTitle(`Missing Category`)
                .setDescription(`You didn't provide a category, please provide a category: **${bot.loading.map(mod => mod.charAt(0).toUpperCase() + mod.slice(1)).join(", ")}**.`)
                .setColor(0xFF0000)
            );
        }

    }
}