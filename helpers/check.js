const bcrypt = require('bcrypt');
const saltRounds = 10;

const check = async (password, hash) => {

    return await bcrypt.compare(String(password),hash).then(e => {
        return e;
    });
}

module.exports = check;