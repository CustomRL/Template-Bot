module.exports = async (bot, passed) => {
    console.log(`[INFO]: Node Restarting\n\nNext restart ${new Date(passed.nextRestart).toLocaleString({ timezone: "Los Angeles/America" })}`);
    process.exit(100);
}

