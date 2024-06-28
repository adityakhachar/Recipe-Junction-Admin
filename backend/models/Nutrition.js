const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for nutrition collection
const nutritionSchema = new Schema({
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    serving: [{
        serving_item_name: {
            type: String,
            required: true
        },
        amount_gm: {
            type: Number,
            required: true
        }
    }],
    calories: {
        type: Number,
        required: true
    }
});

// Create model for nutrition collection
const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
