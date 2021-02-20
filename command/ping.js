module.exports = {
    name: "ping",
    description: `ping.`,
    run: async (bot, message) => {
        let start = Date.now();

        return message.channel.send('Pong! ')
            .then(msg => {
                let diff = (Date.now() - start);
                return msg.edit(`Pong! \`${diff}ms\``);
            });
    }
}