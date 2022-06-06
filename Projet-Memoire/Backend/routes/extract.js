const express = require('express');
const router = express.Router();

const extractController = require('../controllers/extract');

router.post('/extract' ,extractController.Extract);

module.exports = router ; 