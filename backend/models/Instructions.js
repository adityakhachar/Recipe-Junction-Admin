const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for instructions collection
const instructionsSchema = new Schema({
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    instructions: [{
        text: {
            type: String,
            required: true
        },
        image: {
            type: String, // Assuming image URLs are stored as strings
            default: null // Optional field, defaults to null if not provided
        }
    }],
    notes: [{
        type: String,
        required: true
    }]
});

// Create model for instructions collection
const Instructions = mongoose.model('Instructions', instructionsSchema);

module.exports = Instructions;
