require('dotenv').config();

function checkRole(req, res, next) {
    if (res.locals.role === process.env.ADMIN) {
        next();
    } else
        res.sendStatus(401);

};

module.exports = { checkRole: checkRole} ;