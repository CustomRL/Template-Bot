/**
 * Split a message or message array by a number of characters
 * @param {String|Array} message The message or array to split
 * @param {Number} len The length to split it by
 * @returns {Array} An array of strings
 */
function splitMessage(message, len) {
    let msgArray = [];

    if (!message) return [];

    if (Array.isArray(message)) {
        message = message.join('\n');
    }

    if (message.length > len) {
        let str = '', pos;
        while (message.length > 0) {
            // split on last newline
            pos = message.length > len ? message.lastIndexOf('\n', len) : message.length;
            // if there's no newlines
            if (pos > len) pos = len;

            // grab the substring, and remove from message
            str = message.substr(0, pos);
            message = message.substr(pos);

            // push to array
            msgArray.push(str);
        }
    } else {
        msgArray.push(message);
    }

    return msgArray;
}

module.exports = { splitMessage }