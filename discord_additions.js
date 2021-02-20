const Discord = require('discord.js');

Discord.Client.prototype.isBotDeveloper = function (mem) {
    if (typeof mem == "object" ? this.userid = mem.id : this.userid = mem);
    this.developers = process.env.DEVELOPERS.toString().split(", ");
    if (this.developers.includes(this.userid)) return true;
    return false;
};

Object.defineProperty(Discord.GuildMember.prototype, "developer", {
    get: function () {
        this.developers = process.env.DEVELOPERS.toString().split(", ");
        return (this.developers.includes(this.user.id));
    }
});

Object.defineProperty(Discord.GuildMember.prototype, "isStaff", {
    get: function () {
        return (this.hasPermission("MANAGE_CHANNELS"))
    }
})

Discord.Message.prototype.checkMember = function (type, amount = 1) {
    this.msg = this.content;
    let userRegex = /[0-9]{16,19}/g;
    let userMatches = this.msg.match(userRegex);
    if (userMatches == null) return false;
    return (userMatches).slice(0, amount)
};