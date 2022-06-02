const db = require('../util/database');


module.exports = class user{
    constructor(name,email,password,role,matricule,status,date){
        this.name = name ; 
        this.email = email;
        this.password = password ; 
        this.role = role ; 
        this.matricule ; 
        this.date = date ; 
        this.status = status ; 
    }; 

    static changePassword(newPassword,email){
        return db.query(
            "UPDATE users SET USER_PASSWORD = ? WHERE USER_EMAIL = ? ",[newPassword,email]
        ); 
    }

    static dateUser(email){
        return db.query(
            "UPDATE users SET USER_DATE = NOW() WHERE USER_EMAIL = ? ",[email]
        );
    }

    static save(user){
        return db.query(
            "INSERT INTO users (USER_NAME,USER_EMAIL,USER_PASSWORD,USER_ROLE,USER_MATRICULE,USER_DATE,USER_STATUS)  VALUES (?,?,?,?,?,NOW(),'false')",[user.name,user.email,user.password,user.role,user.matricule,user.date,user.status]
        );
    }

};

