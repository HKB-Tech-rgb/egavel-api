const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');
module.exports = {
    issue(payload, expiresIn){
        return jwt.sign(payload, config.development.secret, {
            expiresIn: expiresIn
        })
    }
};