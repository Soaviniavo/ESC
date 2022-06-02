const connection = require('../util/database');
const user = require('../models/user');
const DikaCryptJS = require("dikacryptjs");

const CryptJS = new DikaCryptJS.CryptJS({
    useBase64: true
});


exports.GetAllUsers = (req, res) => {
    var query = "SELECT USER_ID,USER_NAME,USER_EMAIL,USER_ROLE,USER_MATRICULE,USER_DATE,USER_STATUS FROM users WHERE USER_ROLE NOT LIKE 'Administrateur' ";
    connection.query(query, (err,result) => {
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    });
}


exports.checkToken = (req,res) => {
    return res.status(200).json({message: "true"});
}


exports.validateUser = (req, res, next) => {
    let user = req.body;
    var query = "UPDATE users SET USER_STATUS = ? WHERE users.USER_ID = ? ";
    let status = true ; 
    connection.query(query, [status, user.id], (err, result) => {
        if (err) {
            if (result.affectedRows == 0) {
                return res.status().json({ message: "L' id de l'Utilisateur n'existe pas!" });
            } else {
                return res.status().json({ message: "L' utilisateur a été validé !" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
}

exports.changePassword = (req, res, next) => {
    const userInfo = req.body;
    const email = res.locals.email;
    //console.log(res.locals.email);
    var query = 'SELECT * FROM users WHERE USER_EMAIL = ?'; 
    connection.query(query, [email], (err, result) => {
        if (!err) {
            const salt = CryptJS.genSaltSync();
            let decryptPassword = CryptJS.decrypt(result[0].USER_PASSWORD, salt, "Base64");
            if (decryptPassword != userInfo.oldPassword) {
                return res.status(400).json({ message: "L'ancien Mot de Passe est Incorrect ! " });
            } else {
                const salt = CryptJS.genSaltSync();
                let EncryptNewPassword = CryptJS.encrypt(userInfo.newPassword, salt, "Base64");
                /*user.changePassword(EncryptNewPassword,email);
                res.status(200).json({message: 'Nouveau Mot de passe enregistrer! '});*/
                
                query = 'UPDATE users SET USER_PASSWORD = ? WHERE USER_EMAIL = ? '  ; 
                connection.query(query,[EncryptNewPassword,email], (err,reult) => {
                    if(!err){
                        res.status(200).json({message: 'Votre Nouveau Mot de passe à été enregistré! '});
                    }else{
                        return res.status(500).json(err) ; 
                    }
                });
               
            }
        } else {
            return res.status(500).json(err);
        }
    });
     res.status(200);

};



