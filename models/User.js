// packages
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    epost: {
        type: String
    },
    brukernavn: {
        type: String
    },
    passord: {
        type: String
    },
    admin: {
        type: Boolean
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;