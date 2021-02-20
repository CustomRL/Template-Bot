module.exports = async (bot, guild, user) => {
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    const banLog = fetchedLogs.entries.first();

    if (!banLog) return;

    const { executor, target } = banLog;

    if (target.id === user.id && executor != bot.user.id) {
    }
}