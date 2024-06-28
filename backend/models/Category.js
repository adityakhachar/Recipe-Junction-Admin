const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define schema for categories collection
const categorySchema = new Schema({
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    cuisine_type: [{
        type: String,
        enum: ['Italian', 'Indian', 'Chinese', 'Japanese', 'Mexican', 'French', 'Mediterranean', 'Custom'],
        required: true
    }],
    dietary: [{
        type: String,
        enum: ['Vegan', 'Vegetarian', 'Pescatarian', 'Gluten-free', 'Lactose-free', 'Sugar-free', 'Non-vegetarian', 'Custom'],
        required: true
    }],
    meal_type: [{
        type: String,
        enum: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Custom'],
        required: true
    }]
});

// Create model for categories collection
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
