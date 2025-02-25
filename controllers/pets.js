const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

// CREATE - Post HTTP Method to /pets
// Already in the /pets route from server.js so no need to add it in the route here
router.post('/', async (req, res) => {
  try {
    const createdPet = await Pet.create(req.body);
    res.status(201).json(createdPet);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//INDEX - Get ALL items in the pets array
router.get('/', async (req, res) => {
  try {
    const foundPets = await Pet.find();
    res.status(200).json(foundPets);
  } catch (error) {
    res.status(500).json({ err: err.message });
  }
});

// SHOW - Show 1 item based off the id
router.get('/:petId', async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId);
    res.status(200).json(foundPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
