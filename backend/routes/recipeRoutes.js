const express = require('express');
const { addRecipe } = require('../controllers/recipeController');

const router = express.Router();

// Define the POST route to add a recipe
router.post('/', addRecipe);

module.exports = router;
