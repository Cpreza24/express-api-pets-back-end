const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    res.json({ message: 'Create Route' });
});


module.exports = router;