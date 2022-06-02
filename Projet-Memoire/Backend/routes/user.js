const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


router.patch('/validateUser',auth.authenticateToken,checkRole.checkRole,userController.validateUser) ;  
router.get('/allUsers',auth.authenticateToken,checkRole.checkRole,userController.GetAllUsers);
router.get('/checkToken',auth.authenticateToken,userController.checkToken);
router.post('/changePassword',auth.authenticateToken,userController.changePassword);

module.exports = router ; 