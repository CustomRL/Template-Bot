class Restarter {
    constructor(bot, now, basis) {
        this.bot = bot;
        this.now = now;
        this.scheduled = false;
        this.rate = basis;
        this.time = convertDelayStringToMS(this.rate);
        this.lastRestart = null;
        this.nextRestart = null;
    }

    schedule = () => {
        this.nextRestart = Date.now() + this.time;
        this.scheduleManager();
    }

    scheduleManager = () => {

        setInterval(() => {
            if (this.nextRestart != null) {
                if ((this.nextRestart - Date.now()) <= 0) {
                    this.changeLastRestart = Date.now();
                    this.changeNextRestart = Date.now() + this.time;
                    this.bot.emit('restartingNode', (this.bot, { nextRestart: this.nextRestart, reason: `Automatic restart` }));

                }
            }
        }, 1000);
    }

    set changeNextRestart(newTime) {
        this.nextRestart = newTime;
    }

    set changeLastRestart(newTime) {
        this.lastRestart = newTime;
    }

    get nextRestartTime() {
        return this.nextRestart;
    }
}

module.exports = Restarter;

const delayStringRegex = /^([0-9]+)(?:([dhms])[a-z]*)?/i;

/**
 * @param {String} str
 * @returns {Number|null}
 */
function convertDelayStringToMS(str) {
    let match;
    let ms = 0;

    str = str.trim();
    while (str !== '' && (match = str.match(delayStringRegex)) !== null) {
        if (match[2] === 'd') ms += match[1] * 1000 * 60 * 60 * 24;
        else if (match[2] === 'h') ms += match[1] * 1000 * 60 * 60;
        else if (match[2] === 's') ms += match[1] * 1000;
        else if (match[2] === 'm' || !match[2]) ms += match[1] * 1000 * 60;

        str = str.slice(match[0].length);
    }

    // Invalid delay string
    if (str !== '') {
        return null;
    }
    return ms
}