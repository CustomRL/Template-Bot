const Discord = require('discord.js');
module.exports = {
    name: "eval",
    description: `eval.`,
    permissions: ["DEVELOPER"],
    run: async (bot, message) => {
        const args = message.content.split(/ +/g);
        const expression = message.content.slice(args[0].length).trim();

        this.sanitize = (text) => {
            if (typeof (text) === "string") {
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            } else {
                return text;
            }
        }

        try {
            let evaled = await eval(expression);

            if (typeof evaled !== "string") {
                evaled = require('util').inspect(evaled);
            }

            let split = splitMessage(this.sanitize(evaled));

            split.forEach(msg => {
                message.channel.send("```js\n" + (msg ? msg : "Nothing..") + "```")
            })
        } catch (evalError) {
            let split = splitMessage(this.sanitize(evalError));
            split.forEach(msg => {
                message.channel.send("```js\n" + (msg ? msg : "Nothing..") + "```")
            })
        }
    }
}

// We don't care about formatting, we'll do it based on string length
function splitMessage(str, length = 1900) {

    this.length = length;
    this.messages = [];

    while (str.length >= this.length) {
        this.messages.push(str.slice(0, length));
        str = str.slice(length);
    };
    this.messages.push(str);
    return this.messages;
}