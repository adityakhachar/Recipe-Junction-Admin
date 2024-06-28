const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define schema for ingredients collection
const ingredientsSchema = new Schema({
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }]
});

// Create model for ingredients collection
const Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = Ingredients;
