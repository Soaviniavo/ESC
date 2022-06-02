const connection = require('../util/database');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Pour envoi email
const nodemailer = require('nodemailer');


//pour le cryptage et decryptage
const DikaCryptJS = require("dikacryptjs");
const CryptJS = new DikaCryptJS.CryptJS({
    useBase64: true
})


exports.signIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = "SELECT * FROM users WHERE USER_EMAIL = ? ";
    connection.query(query, [email], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                console.log("user not exist or wrong password");
                return res.status(401).json({ message: "Email ou Mot de passe incorrect! " });
            } else if (result[0].USER_STATUS === 'false') {
                return res.status(401).json({ message: "Vous devez attendre l'autorisation de l' Admin! " });
            } else {
                //Generate salt
                const salt = CryptJS.genSaltSync();
                let decryptPassword = CryptJS.decrypt(result[0].USER_PASSWORD, salt, "Base64");
                console.log(decryptPassword);
                if (password != decryptPassword) {
                    res.status(401).json({ message: 'Email ou Mot de passe Incorrect!' });
                } else {
                    //console.log(process.env.ACCESS_TOKEN);
                    user.dateUser(email);
                    const response = { email: result[0].USER_EMAIL, role: result[0].USER_ROLE };
                    const accesstoken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                    res.status(200).json({ token: accesstoken });
                }
            }
        } else {
            return res.status(500).json(err);
        }
    });

}

exports.signUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const matricule = req.body.matricule;
    const date = req.body.date;
    const status = req.body.status;

    if (role !== "Administrateur") {
        const query = "SELECT * FROM users WHERE USER_EMAIL = ? ";
        connection.query(query, [email], (err, results) => {
            if (!err) {
                if (results.length > 0) {
                    res.status(401).json({ message: "L' Email que vous avez saisi existe déjà! " });
                } else {
                    const query = "SELECT * FROM users WHERE USER_MATRICULE = ? ";
                    connection.query(query, [matricule], (err, results) => {
                        if (!err) {
                            if (results.length > 0) {
                                res.status(401).json({ message: "Le Matricule que vous avez saisi existe déjà! " });
                            } else {
                                //Generate salt
                                const salt = CryptJS.genSaltSync();
                                EncryptPassword = CryptJS.encrypt(password, salt, "Base64");
                                // console.log(EncryptPassword)        
                                const userDetails = {
                                    name: name,
                                    email: email,
                                    password: EncryptPassword,
                                    role: role,
                                    matricule: matricule,
                                    date: date,
                                    status: status,
                                }
                                console.log(userDetails);
                                user.save(userDetails);
                                res.status(201).json({ message: 'Votre compte a été créer !' });
                            }
                        } else {
                            return res.status(500).json(err);
                        }
                    })
                }
            } else {
                res.status(500).json(err);
            }
        });
    } else {
        res.status(203).json({ message: "Vous n'avez pas le droit de créer un compte 'Administrateur' ici! " });
    }

};

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

exports.forgotPassword = (req, res) => {
    const email = req.body.email;
    const query = "SELECT * FROM users WHERE USER_EMAIL = ? ";
    connection.query(query, [email], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                return res.status(401).json({ message: "L'email que vous avez entré n'existe pas!" });
            } else {
                const salt = CryptJS.genSaltSync();
                let decryptPassword = CryptJS.decrypt(result[0].USER_PASSWORD, salt, "Base64");
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: result[0].USER_EMAIL,
                    subject: "Mot de passe de l'application web ESC",
                    html: '<p><b>Votre Email:</b>' + result[0].USER_EMAIL + '<br><b>Votre Mot de passe : </b>' + decryptPassword + '<br><a href="http://localhost:4200/login">Se connecter</a></p>'
                }
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email envoyer' + info.response);
                    }
                });
                return res.status(200).json({ message: "l'Envoi de votre Mot de passe à votre Email a été un succès , veuillez verifer votre compte!" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
}


/*function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}*/