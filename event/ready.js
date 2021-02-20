module.exports = async (bot) => {
    const Restarter = require('../autoRestart');

    let restartManager = new Restarter(bot, Date.now(), "12h");
    restartManager.schedule();

    console.log(`${bot.loading.map(module => `\n${module.toString().charAt(0).toUpperCase() + module.toString().slice(1)} | ${Object.keys(bot[module]).length ? Object.keys(bot[module]).join(", ") : "Nothing to show.."}`).join("\n")}`);
    setTimeout(() => {
        console.log(`\n\n${bot.user.username} has started | ${bot.ws.ping}ms heartbeat ping | Ready at ${new Date(bot.readyAt).toLocaleString({ timezone: "Los Angeles/America" })}\n\n[RESTART MANAGER] Bot is scheduled to restart at ${new Date(restartManager.nextRestartTime).toLocaleString({ timezone: "Los Angeles/America" })}`)
    }, 500);
}

