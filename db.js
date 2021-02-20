const sqlite = require('sqlite3').verbose();



let database = new sqlite.Database("./databases/data.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);





const checkCoolDown = (guild, member, command, cooldown) => {

    return new Promise((resolve) => {
        database.all(`SELECT * FROM command_cooldowns WHERE guild = ? AND user = ? AND command = ?`, [guild, member, command], (err, res) => {
            if (!res.length) {
                database.all(`INSERT INTO command_cooldowns VALUES(?, ?, ?, ?)`, [guild, member, new Date(), command], (err, res) => {
                    resolve(true)
                })
            } else {
                let lastUsed = parseInt(res[0].timestamp);
                let dateLastUsed = new Date(lastUsed);


                let sub = ((new Date().getTime()) - (new Date(dateLastUsed).getTime()))

                if (parseInt(sub) >= parseInt(cooldown)) {
                    database.all(`UPDATE command_cooldowns SET timestamp = ? WHERE guild = ? AND user = ? AND command = ?`, [new Date(), guild, member, command], (err, res) => {
                        if (!err) {
                            resolve(true)
                        } else {
                            resolve(err)
                        }
                    })
                } else {
                    resolve([false, sub])
                }
            }
        })
    })
}

const addCommandStat = (date, command) => {
    return new Promise((resolve) => {
        database.all(`INSERT INTO command_stats VALUES(?, ?)`, [date, command], (err, res) => {
            resolve(res)
        })
    })
}

const getCommandStat = (command) => {
    return new Promise((resolve) => {
        database.all(`SELECT * FROM command_stats WHERE command = ?`, [command], (err, res) => {
            resolve(res)
        })
    })
}

const getCommandGlobalStat = () => {
    return new Promise((resolve) => {
        database.all(`SELECT * FROM command_stats`, (err, res) => {
            resolve(res);
        })
    })
}

module.exports = { database, checkCoolDown, addCommandStat, getCommandStat, getCommandGlobalStat }


const init = async () => {
    database.run('CREATE TABLE IF NOT EXISTS command_cooldowns(guild TEXT NOT NULL, user TEXT NOT NULL, timestamp TEXT NOT NULL, command TEXT NOT NULL)');
    database.run('CREATE TABLE IF NOT EXISTS command_stats(timestamp TEXT NOT NULL, command TEXT NOT NULL)');
}

init();