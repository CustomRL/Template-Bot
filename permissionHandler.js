module.exports = meetPermRequirement;

function meetPermRequirement(bot, message, command) {
    let permissions = (message.member.permissions.toArray())

    if (message.member.developer) {
        permissions.push(`DEVELOPER`);
    };

    let permRequire = bot["command"][command];

    if (permRequire.permissions) {
        if (permissions.some((perm) => permRequire.permissions.includes(perm))) {
            return true;
        } else {
            return normalizePermissions(permRequire.permissions.filter((perm) => !permissions.includes(perm)))
        }
    } else {
        return true;
    }
}

function normalizePermissions(permissions) {
    permArray = []
    permissions.forEach(permission => {
        var i, perm = permission.split('_');
        for (i = 0; i < perm.length; i++) {
            perm[i] = perm[i].charAt(0).toUpperCase() + perm[i].slice(1);
        }
        permArray.push(perm.map((perm) => perm.charAt(0) + perm.toLowerCase().slice(1)).join(" "))
    })
    return permArray
}