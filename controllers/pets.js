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
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// SHOW - Show 1 item based off the id
router.get('/:petId', async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId);
    if (!foundPet) {
      res.status(404);
      throw new Error('Pet not found');
    }
    res.status(200).json(foundPet);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

// DELETE - Delete the petId if it exists
router.delete('/:petId', async (req, res) => {
  try {
    const foundPet = await Pet.findByIdAndDelete(req.params.petId);
    if (!foundPet) {
      res.status(404);
      throw new Error('Pet not found');
    }
    res.status(200).json(foundPet);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

// PUT - Updates a pet and returns a json response with the updated pet
router.put('/:petId', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
      new: true,
    });
    if (!updatedPet) {
      res.status(404);
      throw new Error('pet not found');
    }
    res.status(200).json(updatedPet);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

module.exports = router;
