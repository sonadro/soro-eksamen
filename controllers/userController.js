// imports
const User = require('../models/User.js');
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config.json');

// jwt
const maxAge = 60 * 60 * 24 * 3;
const createToken = id => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: maxAge
    });
};

// controller
module.exports.user_signup = async (req, res) => {
    const user = req.body.user;

    // sjekk om brukernavnet er minst 3 tegn
    if (user.brukernavn.length < 3) {
        res.send({
            status: 'Brukernavnet må være minst 3 tegn',
            code: 'userErr'
        });
    } else {
        // brukernavnet er langt nok, sjekk om eposten er gyldig
        if (!validator.validate(user.epost)) {
            res.send({
                status: 'Du må skrive en gyldig e-post',
                code: 'userErr'
            });
        } else {
            // eposten er gyldig, sjekk om passordet er langt nok
            if (user.passord.length < 5) {
                res.send({
                    status: 'Passordet må være minst 5 tegn',
                    code: 'userErr'
                });
            } else {
                // passordet er langt nok, sjekk om begge passordene er like
                if (user.passord !== user.gjentaPassord) {
                    res.send({
                        status: 'Begge passordene må være like',
                        code: 'userErr'
                    });
                } else {
                    // begge passordene er like, sjekk om brukernavnet er tatt
                    const userExists = await User.findOne({ brukernavn: user.brukernavn });
                    if (userExists) {
                        res.send({
                            status: `Det finnes allerede en bruker med brukernavn '${userExists.brukernavn}'`,
                            code: 'userErr'
                        });
                    } else {
                        // brukernavn er ledig, sjekk om epost er tatt
                        const mailExists = await User.findOne({ epost: user.epost });
                        if (mailExists) {
                            res.send({
                                status: `Det finnes allerede en bruker med epost '${mailExists.epost}'`,
                                code: 'userErr'
                            });
                        } else {
                            // epost er ledig, opprett bruker
                            const salt = await bcrypt.genSalt();

                            // opprett bruker med kryptert passord
                            const uploadUser = {
                                epost: user.epost,
                                brukernavn: user.brukernavn,
                                passord: await bcrypt.hash(user.passord, salt)
                            };

                            // lagre brukeren
                            const document = await User.create(uploadUser);

                            // gi brukeren en jwt-cookie
                            const token = createToken(document._id.toString());

                            res.cookie('jwt', token, {
                                sameSite: 'strict',
                                httpOnly: true,
                                expiresIn: maxAge * 1000
                            });

                            res.send({
                                status: 'Brukeren er lagret!',
                                code: 'ok'
                            });
                        };
                    };
                };
            };
        };
    };
};