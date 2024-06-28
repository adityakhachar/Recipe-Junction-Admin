const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for recipes collection
const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true,
        minlength: 200
    },
    youtube_link: {
        type: String
        // Optional field, no additional validation
    },
    cook_time: {
        type: Number,
        required: true
    },
    prep_time: {
        type: Number,
        required: true
    },
    serving_persons: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
        // Reference to categories collection
    }]
});

// Create model for recipes collection
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
