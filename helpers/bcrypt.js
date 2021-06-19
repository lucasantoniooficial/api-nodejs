const hash = require('bcrypt');
const saltRounds = 10;

const bcrypt = async (password) => {
    return await hash.hash(password, saltRounds).then(hash => {
        return hash;
    });
}

module.exports = bcrypt;