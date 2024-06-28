const Recipe = require('../models/Recipe');

// Controller function to add a new recipe
exports.addRecipe = async (req, res) => {
    try {
        const { name, images, description, youtube_link, cook_time, prep_time, serving_persons, difficulty, categories } = req.body;

        // Create a new recipe instance
        const newRecipe = new Recipe({
            name,
            images,
            description,
            youtube_link,
            cook_time,
            prep_time,
            serving_persons,
            difficulty,
            categories
        });

        // Save the recipe to the database
        const savedRecipe = await newRecipe.save();

        // Send the saved recipe as a response
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
