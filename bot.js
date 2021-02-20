const Discord = require('discord.js');
require('dotenv').config();

class Titan extends Discord.Client {
    constructor() {
        return (async () => {
            super();
            this.login(process.env.TOKEN, {
                partials: ['MESSAGE', 'CHANNEL', 'REACTION']
            });

            await this.load(['event', 'command', 'manager'], this);

            require('./discord_additions');
            require('./db');

            Object.keys(this.event).forEach((event) => {
                this.on(event, (...args) => this.event[event](this, ...args));
            });

            return this;
        })();
    };



    load(categories, bot) {
        bot.loading = categories
        return new Promise(async function (resolve, reject) {
            if (categories.length == 0) {
                reject(new Error(`Cannot load 0 categories`));
            } else {
                for await (const category of categories) {
                    bot.loadFolder(category);
                }
                resolve(categories.map((cat) => bot[cat]));
            }
        })
    }

    loadFolder(name) {
        const fs = require('fs');
        if (this[name] == undefined) this[name] = new Map;
        fs.readdirSync(`./${name}`).forEach((file) => {
            // Unload to make sure nothing weird happened;
            this.unloadFile(name, file);
            // Load each category and catch any errors to the console
            this.loadFile(name, file).catch((error) => {
                console.warn(`File Loading Error: An issue occured while loading ${name}/${file}\n\n${error}`);
            });
        })
    };

    loadFile(dir, file) {
        return new Promise((resolve, reject) => {
            try {
                this[dir][file.replace(/.js/g, "")] = require(`./${dir}/${file}`);
                resolve(this[dir][file.replace(/.js/g, "")]);
            } catch (err) {
                resolve(false)
            }
        })
    }

    unloadFile(dir, file) {
        return new Promise((resolve, reject) => {
            try {
                if (require.cache[require.resolve(`./${dir}/${file}`)]) {
                    delete require.cache[require.resolve(`./${dir}/${file}`)];
                    this[dir][file] = undefined
                    resolve();
                } else {
                    this[dir][file] = undefined
                    resolve();
                }
            } catch (err) {
                resolve(false)
            }

        })
    }
}

new Titan();